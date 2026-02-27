"use client";

import Navbar from "@/components/Navbar";
import { PREMIUM_TIER_FEATURES, FREE_TIER_FEATURES, PRICING } from "@/lib/constants";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Domina Lua en{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Unreal Engine 5.6
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            12 meses de formación intensiva · 2 horas diarias · De cero a experto
            · Proyecto final completo incluido
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/register?plan=free"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              Comenzar Gratis
            </Link>
            <Link
              href="/register?plan=premium"
              className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
            >
              Ver Plan Premium
            </Link>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 text-sm text-slate-300 inline-block">
            <p>
              <strong>730 horas</strong> de contenido · <strong>12 fases</strong> progresivas ·{" "}
              <strong>4 proyectos</strong> · <strong>1 juego completo</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-slate-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">730h</div>
            <div className="text-sm text-slate-400">Contenido Total</div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">12</div>
            <div className="text-sm text-slate-400">Módulos</div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">4</div>
            <div className="text-sm text-slate-400">Proyectos</div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">∞</div>
            <div className="text-sm text-slate-400">Actualizaciones</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Lo que aprenderás
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="text-3xl mb-4">💻</div>
            <h3 className="text-lg font-bold text-white mb-3">
              Fundamentos Sólidos
            </h3>
            <p className="text-slate-300 text-sm">
              Lua desde cero, sintaxis, tipos de datos, funciones y tablas.
              Base perfecta para profesionales.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="text-3xl mb-4">🎮</div>
            <h3 className="text-lg font-bold text-white mb-3">
              Integración UE5
            </h3>
            <p className="text-slate-300 text-sm">
              Conecta scripts Lua con Blueprints, C++, y sistemas de Unreal.
              Workflow profesional.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="text-3xl mb-4">⚙️</div>
            <h3 className="text-lg font-bold text-white mb-3">
              Sistemas de Juego
            </h3>
            <p className="text-slate-300 text-sm">
              Inventarios, IA, diálogos, multijugador. 12 sistemas completos
              y probados.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="text-3xl mb-4">🔧</div>
            <h3 className="text-lg font-bold text-white mb-3">
              Herramientas Profesionales
            </h3>
            <p className="text-slate-300 text-sm">
              Editor de Lua online, debugging, profiling. Workflow real de
              producción.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-lg font-bold text-white mb-3">IA Asistente</h3>
            <p className="text-slate-300 text-sm">
              Chat con IA especializado en Lua y UE5. Resuelve dudas al
              instante con contexto de tu código.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-lg font-bold text-white mb-3">
              Proyecto Final
            </h3>
            <p className="text-slate-300 text-sm">
              Construye un juego completo. Publicable en itch.io. Demostrable
              en entrevistas.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Planes y Precios
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-slate-800 border-2 border-slate-700 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Plan Gratuito</h3>
            <div className="text-4xl font-bold text-blue-400 mb-6">$0</div>

            <ul className="space-y-4 mb-8">
              {FREE_TIER_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start text-slate-300">
                  <span className="text-green-400 mr-3 mt-1">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/register?plan=free"
              className="w-full block text-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              Comenzar Ahora
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 border-2 border-blue-400 rounded-lg p-8 transform md:scale-105">
            <div className="text-sm font-semibold text-blue-100 mb-2">
              RECOMENDADO
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Plan Premium</h3>
            <div className="text-4xl font-bold text-white mb-2">
              ${PRICING.monthly.premium}/mes
            </div>
            <div className="text-sm text-blue-50 mb-6">
              o ${PRICING.annually.premium}/año
            </div>

            <ul className="space-y-4 mb-8">
              {PREMIUM_TIER_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start text-white">
                  <span className="mr-3 mt-1">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/register?plan=premium"
              className="w-full block text-center px-6 py-3 bg-white hover:bg-blue-50 text-blue-600 rounded-lg font-semibold transition"
            >
              Empezar Premium
            </Link>
          </div>
        </div>

        <p className="text-center text-slate-400 mt-12">
          Todos los planes incluyen acceso al editor de Lua y al contenido
          correspondiente.
          <br />
          <strong>Sin tarjeta de crédito</strong> para el plan gratuito.
        </p>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para dominar Lua en UE5?
          </h2>
          <p className="text-blue-100 mb-8">
            Únete a cientos de desarrolladores que ya están transformando su
            carrera
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register?plan=free"
              className="px-8 py-3 bg-white hover:bg-blue-50 text-blue-600 rounded-lg font-semibold transition"
            >
              Registrarse Gratis
            </Link>
            <Link
              href="/register?plan=premium"
              className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold transition"
            >
              Plan Premium
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-slate-400 text-sm">
          <p>© 2024 Lua Master Pro. Todos los derechos reservados.</p>
          <p className="mt-4 space-x-6">
            <a href="#" className="hover:text-white">
              Privacidad
            </a>
            <a href="#" className="hover:text-white">
              Términos
            </a>
            <a href="#" className="hover:text-white">
              Contacto
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
