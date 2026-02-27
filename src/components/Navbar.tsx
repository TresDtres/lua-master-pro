"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-slate-950 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:shadow-lg transition">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Lua Master
            </span>
          </Link>

          <div className="hidden md:flex space-x-8 text-slate-300">
            <Link href="/dashboard" className="hover:text-white transition">
              Dashboard
            </Link>

            {/* Academics Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="hover:text-white transition flex items-center gap-1">
                Aprende 📚
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-0 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg">
                  <Link href="/quiz" className="block px-4 py-3 hover:bg-slate-700 transition rounded-t-lg">
                    📝 Quiz
                  </Link>
                  <Link href="/exams" className="block px-4 py-3 hover:bg-slate-700 transition">
                    🎓 Exámenes
                  </Link>
                  <Link href="/analytics" className="block px-4 py-3 hover:bg-slate-700 transition rounded-b-lg">
                    📊 Analytics
                  </Link>
                </div>
              )}
            </div>

            <Link href="/chat" className="hover:text-white transition">
              Chat IA 🤖
            </Link>
          </div>

          <div className="hidden md:flex space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-slate-300 hover:text-white transition"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Registrarse
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-white hover:bg-slate-800 rounded transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 space-y-2 p-4">
          <Link href="/dashboard" className="block px-4 py-2 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition">
            Dashboard
          </Link>
          <Link href="/quiz" className="block px-4 py-2 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition">
            📝 Quiz
          </Link>
          <Link href="/exams" className="block px-4 py-2 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition">
            🎓 Exámenes
          </Link>
          <Link href="/analytics" className="block px-4 py-2 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition">
            📊 Analytics
          </Link>
          <Link href="/chat" className="block px-4 py-2 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition">
            🤖 Chat IA
          </Link>

          <div className="pt-4 space-y-2 border-t border-slate-700">
            <Link href="/login" className="block px-4 py-2 text-slate-300 hover:text-white transition">
              Iniciar sesión
            </Link>
            <Link href="/register" className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center">
              Registrarse
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
