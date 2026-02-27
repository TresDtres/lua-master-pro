"use client";

import { useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import Link from "next/link";

interface AuthFormProps {
  onSuccess?: () => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!isSupabaseConfigured) {
      setError("Supabase no está configurado. Revisa .env.local");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
        
        setSuccess("¡Inicio de sesión exitoso!");
        setTimeout(() => {
          onSuccess?.();
        }, 1000);
      } else {
        // Registro
        if (!username) {
          setError("El username es requerido");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username
            }
          }
        });
        
        if (error) throw error;
        
        setSuccess("¡Registro exitoso! Revisa tu email para verificar.");
        setTimeout(() => {
          setIsLogin(true);
          setEmail("");
          setPassword("");
          setUsername("");
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm text-slate-400 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="Tu username"
              required={!isLogin}
            />
          </div>
        )}

        <div>
          <label className="block text-sm text-slate-400 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            placeholder="tu@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            placeholder="••••••••"
            required
            minLength={6}
          />
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-600 rounded-lg p-3 text-red-200 text-sm">
            ❌ {error}
          </div>
        )}

        {success && (
          <div className="bg-green-900/30 border border-green-600 rounded-lg p-3 text-green-200 text-sm">
            ✅ {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded-lg font-semibold transition"
        >
          {loading ? "Procesando..." : isLogin ? "Iniciar Sesión" : "Registrarse"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
            setSuccess("");
          }}
          className="text-blue-400 hover:text-blue-300 text-sm"
        >
          {isLogin
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>

      <div className="mt-4 text-center">
        <Link href="/dashboard" className="text-slate-400 hover:text-slate-300 text-sm">
          Continuar sin cuenta →
        </Link>
      </div>
    </div>
  );
}
