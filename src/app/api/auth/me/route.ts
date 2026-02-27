// API endpoint para autenticación - obtener usuario actual
export async function GET() {
  try {
    // En producción, esto verificaría la sesión/JWT del usuario
    // Por ahora retorna un usuario de prueba
    
    return Response.json({
      id: "user-123",
      name: "Desarrollador",
      email: "dev@example.com",
      isPremium: false,
      completedModules: [],
      currentModule: "mes-01",
    });
  } catch (error) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }
}
