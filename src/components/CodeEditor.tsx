"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Editor, { loader, OnMount } from "@monaco-editor/react";

type Environment = "lua" | "roblox" | "unlua" | "minecraft";

// Interfaz exportada para ejemplos
export interface ExampleCode {
  name: string;
  description?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  code: string;
}

interface CodeEditorProps {
  initialCode?: string;
  onRun?: (code: string) => void;
  readOnly?: boolean;
  environment?: Environment;
  height?: string | number;
  showOutput?: boolean;
  onCodeChange?: (code: string) => void;
  isMobile?: boolean; // Para desactivar minimapa en móviles
}

// Configurar Monaco una sola vez
let isMonacoConfigured = false;
if (typeof window !== 'undefined' && !isMonacoConfigured) {
  isMonacoConfigured = true;
  loader.config({
    paths: {
      vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs',
    },
    'vs/nls': {
      availableLanguages: {
        '*': 'es',
      },
    },
  });
}

// Tipos para las definiciones de API
interface ApiDefinition {
  globals?: Record<string, { type: string; signature?: string; description: string }>;
  services?: Array<{
    name: string;
    type: string;
    description: string;
    methods?: Array<{
      name: string;
      signature: string;
      description: string;
      parameters?: Array<{ name: string; type: string; description: string }>;
      returns?: string;
      example?: string;
    }>;
    events?: Array<{ name: string; signature: string; description: string }>;
  }>;
  classes?: Array<{
    name: string;
    extends?: string;
    description: string;
    properties?: Array<{ name: string; type: string; description: string }>;
    methods?: Array<{
      name: string;
      signature: string;
      description: string;
      parameters?: Array<{ name: string; type: string; description: string }>;
      returns?: string;
    }>;
  }>;
  datatypes?: Array<{
    name: string;
    description: string;
    constructors?: Array<{ signature: string; description: string }>;
    properties?: Array<{ name: string; type: string; description: string }>;
    methods?: Array<{
      name: string;
      signature: string;
      description: string;
    }>;
    constants?: Array<{ name: string; description?: string }>;
    operators?: Array<{ op: string; description: string }>;
  }>;
  enums?: Array<{
    name: string;
    values: string[];
  }>;
  snippets?: Array<{
    prefix: string;
    body: string;
    description: string;
  }>;
}

// Estado del editor
interface EditorState {
  apiData: ApiDefinition | null;
  keywords: Set<string>;
  functions: Map<string, { params: string[]; description: string }>;
}

export default function CodeEditor({
  initialCode = '-- Escribe tu código Lua aquí\nprint("Hello, Lua!")',
  onRun,
  readOnly = false,
  environment = "lua",
  height = "500px",
  showOutput = true,
  onCodeChange,
  isMobile = false,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [fengariLoaded, setFengariLoaded] = useState(false);
  const [editorState, setEditorState] = useState<EditorState>({
    apiData: null,
    keywords: new Set(),
    functions: new Map(),
  });
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const isMobileRef = useRef(isMobile);
  
  // Callback para resize del contenedor
  const handleContainerResize = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  }, []);
  
  // Actualizar ref cuando cambie isMobile
  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  // Cleanup para ResizeObserver
  useEffect(() => {
    return () => {
      window.removeEventListener('editor-container-resize', handleContainerResize);
    };
  }, [handleContainerResize]);

  const completionProviderDisposable = useRef<any>(null);
  const hoverProviderDisposable = useRef<any>(null);
  const signatureProviderDisposable = useRef<any>(null);

  // Cargar Fengari para ejecución de Lua en el navegador
  useEffect(() => {
    const loadFengari = async () => {
      if (typeof window !== "undefined" && !(window as any).fengari) {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/fengari-web@0.1.4/dist/fengari-web.js";
        script.async = true;
        script.onload = () => setFengariLoaded(true);
        document.body.appendChild(script);
      } else if ((window as any).fengari) {
        setFengariLoaded(true);
      }
    };
    loadFengari();
  }, []);

  // Procesar definiciones de API y extraer información útil
  const processApiDefinitions = useCallback((data: ApiDefinition) => {
    const keywords = new Set<string>();
    const functions = new Map<string, { params: string[]; description: string }>();

    // Palabras clave de Lua
    const luaKeywords = [
      "and", "break", "do", "else", "elseif", "end", "false", "for",
      "function", "goto", "if", "in", "local", "nil", "not", "or",
      "repeat", "return", "then", "true", "until", "while"
    ];
    luaKeywords.forEach(kw => keywords.add(kw));

    // Extraer globals
    if (data.globals) {
      Object.entries(data.globals).forEach(([name, def]) => {
        keywords.add(name);
        if (def.signature) {
          const paramsMatch = def.signature.match(/\(([^)]*)\)/);
          const params = paramsMatch ? paramsMatch[1].split(",").map(p => p.trim()).filter(p => p) : [];
          functions.set(name, { params, description: def.description });
        }
      });
    }

    // Extraer servicios
    if (data.services) {
      data.services.forEach(service => {
        keywords.add(service.name);
        if (service.methods) {
          service.methods.forEach(method => {
            keywords.add(`${service.name}.${method.name}`);
            const paramsMatch = method.signature.match(/\(([^)]*)\)/);
            const params = paramsMatch ? paramsMatch[1].split(",").map(p => p.trim()).filter(p => p && p !== "void") : [];
            functions.set(`${service.name}.${method.name}`, { params, description: method.description });
          });
        }
      });
    }

    // Extraer clases
    if (data.classes) {
      data.classes.forEach(cls => {
        keywords.add(cls.name);
        if (cls.methods) {
          cls.methods.forEach(method => {
            const paramsMatch = method.signature.match(/\(([^)]*)\)/);
            const params = paramsMatch ? paramsMatch[1].split(",").map(p => p.trim()).filter(p => p && p !== "void") : [];
            functions.set(`${cls.name}.${method.name}`, { params, description: method.description });
          });
        }
        if (cls.properties) {
          cls.properties.forEach(prop => {
            keywords.add(`${cls.name}.${prop.name}`);
          });
        }
      });
    }

    // Extraer datatypes
    if (data.datatypes) {
      data.datatypes.forEach(dt => {
        keywords.add(dt.name);
        if (dt.constructors) {
          dt.constructors.forEach(constructor => {
            const nameMatch = constructor.signature.match(/^([^(]+)/);
            if (nameMatch) {
              const constructorName = nameMatch[1].split(":")[0].trim();
              const paramsMatch = constructor.signature.match(/\(([^)]*)\)/);
              const params = paramsMatch ? paramsMatch[1].split(",").map(p => p.trim()).filter(p => p) : [];
              functions.set(constructorName, { params, description: dt.description });
            }
          });
        }
        if (dt.methods) {
          dt.methods.forEach(method => {
            const paramsMatch = method.signature.match(/\(([^)]*)\)/);
            const params = paramsMatch ? paramsMatch[1].split(",").map(p => p.trim()).filter(p => p && p !== "void") : [];
            functions.set(`${dt.name}:${method.name}`, { params, description: method.description });
          });
        }
      });
    }

    return { apiData: data, keywords, functions };
  }, []);

  // Cargar definiciones de API para el entorno seleccionado
  useEffect(() => {
    const loadApiDefinitions = async () => {
      if (environment === "lua") {
        // Lua estándar - definiciones básicas
        const basicData: ApiDefinition = {
          globals: {
            "print": { type: "function", signature: "print(...: any)", description: "Print values to output" },
            "type": { type: "function", signature: "type(value: any): string", description: "Get the type of a value" },
            "tonumber": { type: "function", signature: "tonumber(e: any, base?: number): number?", description: "Convert to number" },
            "tostring": { type: "function", signature: "tostring(v: any): string", description: "Convert to string" },
            "pairs": { type: "function", signature: "pairs(t: table): function", description: "Iterate over table" },
            "ipairs": { type: "function", signature: "ipairs(t: table): function", description: "Iterate over array" },
            "next": { type: "function", signature: "next(table: table, index?: any): any", description: "Get next key-value pair" },
            "select": { type: "function", signature: "select(index: number, ...: any): any", description: "Select arguments" },
            "unpack": { type: "function", signature: "unpack(list: table, i?: number, j?: number): ...any", description: "Unpack table" },
            "rawget": { type: "function", signature: "rawget(table: table, index: any): any", description: "Get raw value" },
            "rawset": { type: "function", signature: "rawset(table: table, index: any, value: any): table", description: "Set raw value" },
            "getmetatable": { type: "function", signature: "getmetatable(table: any): table?", description: "Get metatable" },
            "setmetatable": { type: "function", signature: "setmetatable(table: table, metatable: table): table", description: "Set metatable" },
            "error": { type: "function", signature: "error(message: any, level?: number): never", description: "Throw error" },
            "pcall": { type: "function", signature: "pcall(f: function, ...: any): boolean, any", description: "Protected call" },
            "xpcall": { type: "function", signature: "xpcall(f: function, msgh: function, ...: any): boolean, any", description: "Extended protected call" },
            "load": { type: "function", signature: "load(chunk: string, chunkname?: string, mode?: string, env?: table): function?", description: "Load chunk" },
            "loadfile": { type: "function", signature: "loadfile(filename?: string, mode?: string, env?: table): function?", description: "Load file" },
            "dofile": { type: "function", signature: "dofile(filename?: string): ...any", description: "Execute file" },
            "collectgarbage": { type: "function", signature: "collectgarbage(opt?: string, arg?: any): any", description: "Garbage collection" },
            "coroutine.create": { type: "function", signature: "create(f: function): thread", description: "Create coroutine" },
            "coroutine.resume": { type: "function", signature: "resume(co: thread, ...: any): boolean, ...any", description: "Resume coroutine" },
            "coroutine.yield": { type: "function", signature: "yield(...: any): ...any", description: "Yield coroutine" },
            "coroutine.status": { type: "function", signature: "status(co: thread): string", description: "Get coroutine status" },
            "coroutine.wrap": { type: "function", signature: "wrap(f: function): function", description: "Wrap coroutine" },
            "string.byte": { type: "function", signature: "byte(s: string, i?: number, j?: number): ...number", description: "Get byte" },
            "string.char": { type: "function", signature: "char(...: number): string", description: "Create string" },
            "string.sub": { type: "function", signature: "sub(s: string, i: number, j?: number): string", description: "Substring" },
            "string.len": { type: "function", signature: "len(s: string): number", description: "String length" },
            "string.lower": { type: "function", signature: "lower(s: string): string", description: "To lowercase" },
            "string.upper": { type: "function", signature: "upper(s: string): string", description: "To uppercase" },
            "string.rep": { type: "function", signature: "rep(s: string, n: number, sep?: string): string", description: "Repeat string" },
            "string.reverse": { type: "function", signature: "reverse(s: string): string", description: "Reverse string" },
            "string.format": { type: "function", signature: "format(fmt: string, ...: any): string", description: "Format string" },
            "string.find": { type: "function", signature: "find(s: string, pattern: string, init?: number, plain?: boolean): number?, number?", description: "Find pattern" },
            "string.match": { type: "function", signature: "match(s: string, pattern: string, init?: number): ...any", description: "Match pattern" },
            "string.gsub": { type: "function", signature: "gsub(s: string, pattern: string, repl: any, n?: number): string, number", description: "Global substitute" },
            "string.gmatch": { type: "function", signature: "gmatch(s: string, pattern: string): function", description: "Global match iterator" },
            "string.split": { type: "function", signature: "split(s: string, sep?: string): { string }", description: "Split string" },
            "string.trim": { type: "function", signature: "trim(s: string): string", description: "Trim whitespace" },
            "table.insert": { type: "function", signature: "insert(list: table, pos?: number, value: any)", description: "Insert value" },
            "table.remove": { type: "function", signature: "remove(list: table, pos?: number): any", description: "Remove value" },
            "table.sort": { type: "function", signature: "sort(list: table, comp?: function)", description: "Sort table" },
            "table.concat": { type: "function", signature: "concat(list: table, sep?: string, i?: number, j?: number): string", description: "Concatenate" },
            "table.pack": { type: "function", signature: "pack(...: any): { n: number, [number]: any }", description: "Pack values" },
            "table.unpack": { type: "function", signature: "unpack(list: table, i?: number, j?: number): ...any", description: "Unpack values" },
            "math.abs": { type: "function", signature: "abs(x: number): number", description: "Absolute value" },
            "math.acos": { type: "function", signature: "acos(x: number): number", description: "Arc cosine" },
            "math.asin": { type: "function", signature: "asin(x: number): number", description: "Arc sine" },
            "math.atan": { type: "function", signature: "atan(y: number, x?: number): number", description: "Arc tangent" },
            "math.ceil": { type: "function", signature: "ceil(x: number): number", description: "Ceiling" },
            "math.cos": { type: "function", signature: "cos(x: number): number", description: "Cosine" },
            "math.deg": { type: "function", signature: "deg(x: number): number", description: "Radians to degrees" },
            "math.exp": { type: "function", signature: "exp(x: number): number", description: "Exponential" },
            "math.floor": { type: "function", signature: "floor(x: number): number", description: "Floor" },
            "math.fmod": { type: "function", signature: "fmod(x: number, y: number): number", description: "Modulo" },
            "math.huge": { type: "constant", description: "Infinity" },
            "math.log": { type: "function", signature: "log(x: number, base?: number): number", description: "Logarithm" },
            "math.max": { type: "function", signature: "max(...: number): number", description: "Maximum" },
            "math.min": { type: "function", signature: "min(...: number): number", description: "Minimum" },
            "math.pi": { type: "constant", description: "Pi constant" },
            "math.pow": { type: "function", signature: "pow(x: number, y: number): number", description: "Power" },
            "math.rad": { type: "function", signature: "rad(x: number): number", description: "Degrees to radians" },
            "math.random": { type: "function", signature: "random(m?: number, n?: number): number", description: "Random number" },
            "math.sin": { type: "function", signature: "sin(x: number): number", description: "Sine" },
            "math.sqrt": { type: "function", signature: "sqrt(x: number): number", description: "Square root" },
            "math.tan": { type: "function", signature: "tan(x: number): number", description: "Tangent" },
            "os.date": { type: "function", signature: "date(format?: string, time?: number): string", description: "Format date" },
            "os.time": { type: "function", signature: "time(date?: table): number", description: "Get time" },
            "os.difftime": { type: "function", signature: "difftime(t2: number, t1: number): number", description: "Time difference" },
            "io.open": { type: "function", signature: "open(filename: string, mode?: string): file?", description: "Open file" },
            "io.read": { type: "function", signature: "read(...: string): ...any", description: "Read from stdin" },
            "io.write": { type: "function", signature: "write(...: string): file", description: "Write to stdout" },
            "io.lines": { type: "function", signature: "lines(filename: string): function", description: "Read file lines" },
            "debug.getinfo": { type: "function", signature: "getinfo(f: function|number, what?: string): table", description: "Get function info" },
            "debug.traceback": { type: "function", signature: "traceback(message?: string, level?: number): string", description: "Get traceback" },
          },
          snippets: [
            { prefix: "for", body: "for i = 1, ${1:count} do\n\t${2:print(i)}\nend", description: "For loop" },
            { prefix: "foreach", body: "for ${1:index}, ${2:value} in ipairs(${3:table}) do\n\t${4:print(index, value)}\nend", description: "For each loop" },
            { prefix: "forpair", body: "for ${1:key}, ${2:value} in pairs(${3:table}) do\n\t${4:print(key, value)}\nend", description: "For pairs loop" },
            { prefix: "if", body: "if ${1:condition} then\n\t${2:print('true')}\nend", description: "If statement" },
            { prefix: "ifel", body: "if ${1:condition} then\n\t${2:print('true')}\nelse\n\t${3:print('false')}\nend", description: "If-else statement" },
            { prefix: "func", body: "local function ${1:functionName}(${2:params})\n\t${3:-- body}\nend", description: "Function" },
            { prefix: "while", body: "while ${1:condition} do\n\t${2:print('looping')}\nend", description: "While loop" },
            { prefix: "repeat", body: "repeat\n\t${1:print('looping')}\nuntil ${2:condition}", description: "Repeat until loop" },
            { prefix: "pcall", body: "local success, result = pcall(function()\n\t${1:-- code}\nend)\nif not success then\n\twarn('Error:', result)\nend", description: "Protected call" },
          ],
        };
        setEditorState(processApiDefinitions(basicData));
        return;
      }

      try {
        const response = await fetch(`/lua-types/${environment}/api.json`);
        if (!response.ok) throw new Error(`Failed to load API definitions`);
        const data: ApiDefinition = await response.json();
        setEditorState(processApiDefinitions(data));
      } catch (error) {
        console.error(`Error loading API definitions for ${environment}:`, error);
      }
    };

    loadApiDefinitions();
  }, [environment, processApiDefinitions]);

  // Configurar proveedores de IntelliSense
  useEffect(() => {
    if (!monacoRef.current || !editorRef.current || !editorState.apiData) return;

    const monaco = monacoRef.current;
    const editor = editorRef.current;

    // Limpiar proveedores anteriores
    if (completionProviderDisposable.current) {
      completionProviderDisposable.current.dispose();
    }
    if (hoverProviderDisposable.current) {
      hoverProviderDisposable.current.dispose();
    }
    if (signatureProviderDisposable.current) {
      signatureProviderDisposable.current.dispose();
    }

    // Registrar proveedor de autocompletado
    completionProviderDisposable.current = monaco.languages.registerCompletionItemProvider("lua", {
      triggerCharacters: [".", ":", "(", ",", " "],
      provideCompletionItems: (model: any, position: any) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endLineNumber: position.lineNumber,
          endColumn: word.endColumn,
        };

        const suggestions: any[] = [];
        const data = editorState.apiData!;

        // Agregar globals
        if (data.globals) {
          Object.entries(data.globals).forEach(([name, def]) => {
            suggestions.push({
              label: name,
              kind: def.type === "function" 
                ? monaco.languages.CompletionItemKind.Function 
                : monaco.languages.CompletionItemKind.Variable,
              detail: def.signature || def.type,
              documentation: def.description,
              insertText: name,
              range,
            });
          });
        }

        // Agregar servicios
        if (data.services) {
          data.services.forEach(service => {
            suggestions.push({
              label: service.name,
              kind: monaco.languages.CompletionItemKind.Class,
              detail: service.type,
              documentation: service.description,
              insertText: service.name,
              range,
            });

            if (service.methods) {
              service.methods.forEach(method => {
                suggestions.push({
                  label: `${service.name}.${method.name}`,
                  kind: monaco.languages.CompletionItemKind.Method,
                  detail: method.signature,
                  documentation: method.description,
                  insertText: method.name,
                  range,
                });
              });
            }
          });
        }

        // Agregar clases
        if (data.classes) {
          data.classes.forEach(cls => {
            suggestions.push({
              label: cls.name,
              kind: monaco.languages.CompletionItemKind.Class,
              detail: cls.extends ? `extends ${cls.extends}` : "class",
              documentation: cls.description,
              insertText: cls.name,
              range,
            });

            if (cls.methods) {
              cls.methods.forEach(method => {
                suggestions.push({
                  label: `${cls.name}:${method.name}`,
                  kind: monaco.languages.CompletionItemKind.Method,
                  detail: method.signature,
                  documentation: method.description,
                  insertText: method.name,
                  range,
                });
              });
            }

            if (cls.properties) {
              cls.properties.forEach(prop => {
                suggestions.push({
                  label: `${cls.name}.${prop.name}`,
                  kind: monaco.languages.CompletionItemKind.Property,
                  detail: prop.type,
                  documentation: prop.description,
                  insertText: prop.name,
                  range,
                });
              });
            }
          });
        }

        // Agregar datatypes
        if (data.datatypes) {
          data.datatypes.forEach(dt => {
            suggestions.push({
              label: dt.name,
              kind: monaco.languages.CompletionItemKind.Struct,
              detail: "datatype",
              documentation: dt.description,
              insertText: dt.name,
              range,
            });

            if (dt.constructors) {
              dt.constructors.forEach(constructor => {
                const nameMatch = constructor.signature.match(/^([^(]+)/);
                if (nameMatch) {
                  const constructorName = nameMatch[1].split(":")[0].trim();
                  suggestions.push({
                    label: constructorName,
                    kind: monaco.languages.CompletionItemKind.Constructor,
                    detail: constructor.signature,
                    documentation: constructor.description,
                    insertText: constructorName,
                    range,
                  });
                }
              });
            }

            if (dt.methods) {
              dt.methods.forEach(method => {
                suggestions.push({
                  label: `${dt.name}:${method.name}`,
                  kind: monaco.languages.CompletionItemKind.Method,
                  detail: method.signature,
                  documentation: method.description,
                  insertText: method.name,
                  range,
                });
              });
            }

            if (dt.constants) {
              dt.constants.forEach(constant => {
                suggestions.push({
                  label: constant.name,
                  kind: monaco.languages.CompletionItemKind.Constant,
                  detail: "constant",
                  documentation: constant.description,
                  insertText: constant.name,
                  range,
                });
              });
            }
          });
        }

        // Agregar snippets
        if (data.snippets) {
          data.snippets.forEach(snippet => {
            suggestions.push({
              label: snippet.prefix,
              kind: monaco.languages.CompletionItemKind.Snippet,
              detail: snippet.description,
              documentation: snippet.description,
              insertText: snippet.body,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range,
            });
          });
        }

        return { suggestions };
      },
    });

    // Registrar proveedor de hover (tooltips)
    hoverProviderDisposable.current = monaco.languages.registerHoverProvider("lua", {
      provideHover: (model: any, position: any) => {
        const word = model.getWordAtPosition(position);
        if (!word) return null;

        const wordText = word.word;
        const data = editorState.apiData!;

        // Buscar en globals
        if (data.globals?.[wordText]) {
          const def = data.globals[wordText];
          return {
            contents: [
              { value: "**" + wordText + "**" },
              { value: def.signature ? "```lua\n" + def.signature + "\n```" : "" },
              { value: def.description },
            ],
          };
        }

        // Buscar en servicios
        if (data.services) {
          for (const service of data.services) {
            if (service.name === wordText) {
              return {
                contents: [
                  { value: "**" + service.name + "**" },
                  { value: "```lua\n" + service.type + "\n```" },
                  { value: service.description },
                  ...(service.methods ? [{
                    value: "\n**Methods:**\n" + service.methods.map((m: any) => `- \`${m.name}\``).join("\n")
                  }] : []),
                ],
              };
            }
          }
        }

        // Buscar en clases
        if (data.classes) {
          for (const cls of data.classes) {
            if (cls.name === wordText) {
              return {
                contents: [
                  { value: "**" + cls.name + "**" },
                  { value: cls.extends ? "*extends " + cls.extends + "*" : "" },
                  { value: cls.description },
                  ...(cls.properties ? [{
                    value: "\n**Properties:**\n" + cls.properties.map((p: any) => `- \`${p.name}: ${p.type}\``).join("\n")
                  }] : []),
                ],
              };
            }
          }
        }

        // Buscar en datatypes
        if (data.datatypes) {
          for (const dt of data.datatypes) {
            if (dt.name === wordText) {
              return {
                contents: [
                  { value: "**" + dt.name + "**" },
                  { value: dt.description },
                  ...(dt.constructors ? [{
                    value: "\n**Constructors:**\n" + dt.constructors.map((c: any) => `- \`${c.signature}\``).join("\n")
                  }] : []),
                ],
              };
            }
          }
        }

        return null;
      },
    });

    // Registrar proveedor de signature help
    signatureProviderDisposable.current = monaco.languages.registerSignatureHelpProvider("lua", {
      signatureHelpTriggerCharacters: ["(", ","],
      provideSignatureHelp: (model: any, position: any) => {
        const textUntilPosition = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        // Encontrar la función que se está llamando
        const match = textUntilPosition.match(/([a-zA-Z0-9_.:]+)\([^)]*$/);
        if (!match) return null;

        const functionName = match[1];
        const funcInfo = editorState.functions.get(functionName);
        
        if (!funcInfo) return null;

        // Contar parámetros actuales
        const paramCount = textUntilPosition.split(",").length;

        const signature: any = {
          label: `${functionName}(${funcInfo.params.join(", ")})`,
          parameters: funcInfo.params.map((param: string, index: number) => ({
            label: param,
            documentation: `Parameter ${index + 1}`,
          })),
        };

        return {
          value: {
            signatures: [signature],
            activeSignature: 0,
            activeParameter: Math.min(paramCount - 1, funcInfo.params.length - 1),
          },
          dispose: () => {},
        };
      },
    });

    setEditorReady(true);
  }, [editorState]);

  // Manejar montaje del editor y ResizeObserver
  const handleEditorMount: OnMount = useCallback((editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Escuchar evento de resize del contenedor
    window.addEventListener('editor-container-resize', handleContainerResize);

    // Configurar tema personalizado
    monaco.editor.defineTheme("lua-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword.lua", foreground: "C586C0", fontStyle: "bold" },
        { token: "identifier.lua", foreground: "9CDCFE" },
        { token: "string.lua", foreground: "CE9178" },
        { token: "number.lua", foreground: "B5CEA8" },
        { token: "comment.lua", foreground: "6A9955", fontStyle: "italic" },
        { token: "function.lua", foreground: "DCDCAA", fontStyle: "bold" },
        { token: "operator.lua", foreground: "D4D4D4" },
        { token: "delimiter.lua", foreground: "D4D4D4" },
        { token: "variable.lua", foreground: "9CDCFE" },
      ],
      colors: {
        "editor.background": "#0F172A",
        "editor.lineHighlightBackground": "#1E293B",
        "editorCursor.foreground": "#FFFFFF",
        "editor.selectionBackground": "#264F78",
        "editor.inactiveSelectionBackground": "#264F7855",
        "editorIndentGuide.background": "#334155",
        "editorIndentGuide.activeBackground": "#475569",
        "editorLineNumber.foreground": "#64748B",
        "editorLineNumber.activeForeground": "#94A3B8",
        "editorWhitespace.foreground": "#334155",
        "editorHoverWidget.background": "#1E293B",
        "editorHoverWidget.border": "#334155",
        "editorSuggestWidget.background": "#1E293B",
        "editorSuggestWidget.border": "#334155",
        "editorSuggestWidget.foreground": "#E2E8F0",
        "editorSuggestWidget.selectedBackground": "#334155",
        "editorSuggestWidget.highlightForeground": "#60A5FA",
        "editorWidget.background": "#1E293B",
        "editorWidget.border": "#334155",
        "input.background": "#0F172A",
        "input.border": "#334155",
        "input.foreground": "#E2E8F0",
      },
    });

    monaco.editor.setTheme("lua-dark");

    // Configurar opciones del editor
    editor.updateOptions({
      minimap: { enabled: !isMobileRef.current, maxColumn: isMobileRef.current ? 50 : 100 },
      fontSize: isMobileRef.current ? 16 : 14,
      fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace",
      fontLigatures: true,
      automaticLayout: true,
      scrollBeyondLastLine: false,
      wordWrap: "on",
      tabSize: 2,
      insertSpaces: true,
      suggestOnTriggerCharacters: true,
      quickSuggestions: {
        other: true,
        comments: false,
        strings: false,
      },
      suggestSelection: "first",
      snippetSuggestions: "top",
      readOnly: readOnly,
      lineNumbers: "on",
      lineNumbersMinChars: isMobileRef.current ? 2 : 3,
      folding: true,
      foldingHighlight: true,
      matchBrackets: "always",
      autoClosingBrackets: "always",
      autoClosingQuotes: "always",
      autoIndent: "full",
      formatOnPaste: true,
      formatOnType: true,
      parameterHints: { enabled: true },
      renderWhitespace: "selection",
      renderLineHighlight: "all",
      cursorBlinking: "smooth",
      cursorSmoothCaretAnimation: "on",
      smoothScrolling: true,
      padding: { top: 10, bottom: 10 },
      rulers: [80, 120],
    });

    // Focus en el editor
    editor.focus();
    setEditorReady(true);
  }, [readOnly, isMobile]);

  // Ejecutar código con Fengari (sandbox en el navegador)
  const runLuaWithFengari = useCallback((luaCode: string) => {
    const fengari = (window as any).fengari;
    if (!fengari) {
      setOutput("❌ Error: Fengari no está cargado. Intenta nuevamente.");
      return;
    }

    const { la, to_jsstring, to_luastring } = fengari;

    try {
      const L = la.luaL_newstate();
      la.luaL_openlibs(L);

      // Capturar output de print
      la.luaL_dostring(L, to_luastring(`
        local output = {}
        local original_print = print
        function print(...)
          local args = {...}
          for i, v in ipairs(args) do
            output[#output + 1] = tostring(v)
          end
        end
        function getOutput()
          return table.concat(output, "\\n")
        end
      `));

      // Ejecutar código del usuario
      const result = la.luaL_dostring(L, to_luastring(luaCode));

      if (result === 0) {
        // Obtener output capturado
        la.lua_getglobal(L, to_luastring("getOutput"));
        la.lua_pcall(L, 0, 1, 0);
        const outputStr = to_jsstring(la.lua_tostring(L, -1));
        la.lua_pop(L, 1);

        setOutput(outputStr || "✓ Código ejecutado correctamente (sin salida)");
      } else {
        const error = to_jsstring(la.lua_tostring(L, -1));
        setOutput(`❌ Error de ejecución:\n${error}`);
      }

      la.lua_close(L);
      onRun?.(luaCode);
    } catch (error: any) {
      setOutput(`❌ Error: ${error.message || error}`);
    }
  }, [onRun]);

  // Manejar ejecución
  const handleRun = useCallback(async () => {
    if (!code.trim()) return;

    setLoading(true);

    // Intentar ejecutar con Fengari (client-side)
    if (fengariLoaded && (window as any).fengari) {
      runLuaWithFengari(code);
    } else {
      // Fallback al API del servidor
      try {
        const response = await fetch("/api/lua/execute", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.error) {
            setOutput(`❌ Error: ${result.error}`);
          } else {
            setOutput(result.output || "✓ Código ejecutado correctamente");
          }
          onRun?.(code);
        } else {
          const errorData = await response.json();
          setOutput(`❌ Error: ${errorData.error || "Error al ejecutar el código"}`);
        }
      } catch (error: any) {
        setOutput(`❌ Error de conexión: ${error.message || error}`);
      }
    }

    setLoading(false);
  }, [code, fengariLoaded, onRun, runLuaWithFengari]);

  // Manejar cambio de código
  const handleCodeChange = useCallback((value: string = "") => {
    setCode(value);
    onCodeChange?.(value);
  }, [onCodeChange]);

  // Actualizar código cuando cambie initialCode
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  // Limpiar disposables al desmontar
  useEffect(() => {
    return () => {
      if (completionProviderDisposable.current) {
        completionProviderDisposable.current.dispose();
      }
      if (hoverProviderDisposable.current) {
        hoverProviderDisposable.current.dispose();
      }
      if (signatureProviderDisposable.current) {
        signatureProviderDisposable.current.dispose();
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
      {/* Editor */}
      <div className="flex flex-col bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <h3 className="text-sm font-semibold text-white">
              Editor Lua
            </h3>
            {environment !== "lua" && (
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
                {environment.toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className={`px-2 py-1 rounded ${
              environment === "roblox" ? "bg-red-500/20 text-red-400" :
              environment === "unlua" ? "bg-white/20 text-white" :
              environment === "minecraft" ? "bg-green-500/20 text-green-400" :
              "bg-slate-700 text-slate-300"
            }`}>
              {environment === "roblox" && "🎮 Roblox"}
              {environment === "unlua" && "🎯 Unreal"}
              {environment === "minecraft" && "⛏️ Minecraft"}
              {environment === "lua" && "📜 Lua"}
            </span>
            {fengariLoaded && (
              <span className="text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Ready
              </span>
            )}
          </div>
        </div>
        <div style={{ height }} className="border-b border-slate-700">
          <Editor
            height="100%"
            language="lua"
            theme="lua-dark"
            value={code}
            onChange={handleCodeChange}
            onMount={handleEditorMount}
            loading={
              <div className="flex items-center justify-center h-full text-slate-400 flex-col gap-3">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Cargando editor...</span>
              </div>
            }
            options={{
              minimap: { enabled: !isMobileRef.current, maxColumn: isMobileRef.current ? 50 : 100 },
              fontSize: isMobileRef.current ? 16 : 14,
              automaticLayout: true,
              scrollBeyondLastLine: false,
              wordWrap: "on",
              tabSize: 2,
              suggestOnTriggerCharacters: true,
              quickSuggestions: true,
              readOnly: readOnly,
              parameterHints: { enabled: true },
              snippetSuggestions: "top",
              lineNumbersMinChars: isMobileRef.current ? 2 : 3,
            }}
          />
        </div>
        <div className="bg-slate-800 px-4 py-3 border-t border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleRun}
              disabled={loading || readOnly || !fengariLoaded}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:from-slate-600 disabled:to-slate-700 text-white rounded-md font-medium transition-all flex items-center gap-2 shadow-lg shadow-green-900/20 disabled:shadow-none"
              title={!fengariLoaded ? "Cargando motor Lua..." : ""}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Ejecutando...
                </>
              ) : (
                <>
                  <span>▶</span> Ejecutar
                </>
              )}
            </button>
            <button
              onClick={() => setCode("")}
              disabled={readOnly}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-700/50 text-white rounded-md font-medium transition"
            >
              Limpiar
            </button>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            {!fengariLoaded && (
              <span className="flex items-center gap-1 text-yellow-400">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                Cargando motor...
              </span>
            )}
            <span>Ctrl+Space para autocompletar</span>
          </div>
        </div>
      </div>

      {/* Output */}
      {showOutput && (
        <div className="flex flex-col bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3 border-b border-slate-700">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <span className="text-green-400">▸</span>
              Salida
            </h3>
          </div>
          <div className="flex-1 bg-slate-900 p-4 font-mono text-sm overflow-auto min-h-[200px]">
            <pre className={`whitespace-pre-wrap ${
              output.startsWith("❌") ? "text-red-400" :
              output.startsWith("✓") ? "text-green-400" :
              "text-emerald-400"
            }`}>
              {output || (
                <span className="text-slate-500 italic">
                  La salida del programa aparecerá aquí...
                  {"\n"}
                  {"\n"}
                  Consejos:
                  {"\n"}• Usa Ctrl+Space para autocompletar
                  {"\n"}• Pasa el mouse sobre funciones para ver documentación
                  {"\n"}• Los snippets se activan con su prefijo (for, if, func...)
                </span>
              )}
            </pre>
          </div>
          <div className="bg-slate-800 px-4 py-2 border-t border-slate-700 flex justify-between items-center text-xs text-slate-400">
            <span>Líneas: {code.split("\n").length}</span>
            <span>Caracteres: {code.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}
