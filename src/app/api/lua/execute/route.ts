// Use dynamic import and instantiate the module exported by lua.vm.js
export async function POST(request: Request) {
  const { code } = await request.json();

  if (!code || code.trim() === "") {
    return Response.json({ output: "", error: null });
  }

  try {
    const modImport = await import("lua.vm.js");
    const ModuleFactory: any = modImport.default ?? modImport;
    // The package may export an Emscripten Module factory (function) that returns
    // a Module instance or a Promise. Handle both sync and async factories.
    let ModuleInstance: any;
    if (typeof ModuleFactory === "function") {
      const maybe = ModuleFactory();
      ModuleInstance = maybe instanceof Promise ? await maybe : maybe;
    } else {
      ModuleInstance = ModuleFactory;
    }

    // Create a new Lua State
    const L: any = new ModuleInstance.Lua.State();
    const output: string[] = [];

    // As a more reliable capture (cross Emscripten boundary), override Lua's
    // `print` with a Lua-side implementation that appends to __captured.
    const captureSetup = `__captured = ''\nfunction print(...)\n local parts = {}\n for i=1,select('#',...) do parts[i]=tostring(select(i,...)) end\n __captured = __captured .. table.concat(parts,'\t') .. '\\n'\n end`;
    L.execute(captureSetup);

    try {
      // Execute the user's Lua code
      const res = L.execute(code);

      // Read back the captured output from Lua global __captured
      L.getglobal("__captured");
      let captured: any = null;
      try {
        captured = L.raw_tostring(-1);
      } catch (e) {
        captured = null;
      }
      L.pop(1);

      const outStr = (captured ?? "").replace(/\n$/,'');
      return Response.json({ output: outStr, error: null });
    } catch (luaErr: any) {
      // Try to still extract any captured output on error
      try {
        L.getglobal("__captured");
        const capturedErr = L.raw_tostring(-1);
        L.pop(1);
        const outErr = (capturedErr ?? "").replace(/\n$/,'');
        return Response.json({ output: outErr, error: luaErr?.message ?? String(luaErr) }, { status: 200 });
      } catch (_) {
        return Response.json({ output: "", error: luaErr?.message ?? String(luaErr) }, { status: 200 });
      }
    }
  } catch (error: any) {
    console.error("Lua execution error:", error);
    return Response.json({ output: "", error: error?.message ?? "Error al ejecutar código Lua" }, { status: 500 });
  }
}
