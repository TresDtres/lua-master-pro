// API endpoint para login
export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    // En producción: verificar con BD, crear JWT
    // Por ahora: validación simple
    
    if (!email || !password) {
      return Response.json(
        { message: "Email y contraseña requeridos" },
        { status: 400 }
      );
    }

    // Simular login exitoso
    return Response.json({
      success: true,
      token: "fake-jwt-token",
      user: {
        id: "user-123",
        email,
        name: email.split("@")[0],
        isPremium: false,
      },
    });
  } catch (error) {
    return Response.json({ message: "Error en servidor" }, { status: 500 });
  }
}
