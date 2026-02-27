/**
 * Módulo 12: Portfolio - Lección 12.6
 * Networking: GitHub, LinkedIn, comunidad
 */

import { Lesson } from "@/types/lesson";

export const lesson06: Lesson = {
  id: "mes-12-l06",
  moduleId: "mes-12",
  lessonNumber: 6,
  title: "Networking",
  description: "Networking profesional: GitHub, LinkedIn, y participación en la comunidad.",
  estimatedTime: 40,
  difficulty: "intermediate",
  theory: {
    title: "Networking",
    objectives: ["Optimizar GitHub", "Crear LinkedIn", "Participar en comunidad"],
    estimatedTime: 40,
    sections: [{ heading: "Red Profesional", content: "El networking abre puertas a oportunidades.", codeExamples: [] }],
    summary: "Networking construye relaciones profesionales duraderas.",
  },
  examples: [],
  interactive: {
    title: "Network Tracker",
    description: "Trackea tus conexiones profesionales",
    starterCode: `local network = {\n    connections = 0,\n    AddConnection = function(self, name)\n        self.connections = self.connections + 1\n        print("Connected with " .. name)\n    end\n}\n\nnetwork:AddConnection("Developer 1")\nnetwork:AddConnection("Developer 2")\nprint("Total connections: " .. network.connections)`,
    environment: "lua",
    expectedOutput: "Connected with Developer 1\nConnected with Developer 2\nTotal connections: 2",
  },
  miniExercise: {
    id: "mes-12-l06-exercise",
    lessonId: "mes-12-l06",
    title: "Build Network",
    instructions: "Simula agregar 5 conexiones profesionales.",
    starterCode: `local connections = {}\nfor i = 1, 5 do\n    table.insert(connections, "Connection " .. i)\nend\nprint("Network: " .. #connections .. " connections")`,
    solution: `local connections = {}\nfor i = 1, 5 do\n    table.insert(connections, "Connection " .. i)\nend\nprint("Network: " .. #connections .. " connections")`,
    tests: [{ type: "output_contains", expected: "5", message: "Debe tener 5 conexiones" }],
    hints: ["Usa un loop del 1 al 5"],
    xpReward: 100,
    difficulty: "beginner",
  },
  summary: "Networking incluye: GitHub activo, LinkedIn completo, comunidad participativa.",
  resources: [{ title: "LinkedIn Tips", url: "https://example.com", type: "article" }],
  prerequisites: ["mes-12-l05"],
};
