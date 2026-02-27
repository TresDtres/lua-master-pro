// API endpoint para registro
export async function POST(request: Request) {
  const { email, password, confirmPassword, name, plan } = await request.json();

  try {
    // Validar contraseñas
    if (password !== confirmPassword) {
      return Response.json(
        { message: "Las contraseñas no coinciden" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return Response.json(
        { message: "Contraseña debe tener al menos 8 caracteres" },
        { status: 400 }
      );
    }

    // En producción: guardar en BD, crear JWT
    return Response.json({
      success: true,
      token: "fake-jwt-token",
      user: {
        id: "user-" + Date.now(),
        email,
        name,
        isPremium: plan === "premium",
      },
    });
  } catch (error) {
    return Response.json({ message: "Error en servidor" }, { status: 500 });
  }
}
