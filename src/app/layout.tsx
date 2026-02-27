import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lua Master Pro - Aprende Lua con Unreal Engine 5.6",
  description: "Curso completo de 12 meses de Lua scripting en Unreal Engine 5.6. De cero a experto con proyectos reales, editor de código online y ayuda IA.",
  keywords: "Lua, Unreal Engine, UE5, Scripting, Game Development, Curso",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950`}
      >
        {children}
      </body>
    </html>
  );
}
