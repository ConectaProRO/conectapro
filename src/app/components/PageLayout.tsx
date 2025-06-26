"use client";
import React from "react";
import Link from "next/link";

interface PageLayoutProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, subtitle, children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white py-4 shadow">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-bold">ConectaPro</Link>
            <Link href="/precos-cub" className="hover:underline">Preços CUB</Link>
            <Link href="/cadastro-profissional" className="hover:underline">Cadastrar</Link>
            <Link href="/buscar-profissional" className="hover:underline">Buscar</Link>
            <Link href="/gerador-contrato" className="hover:underline">Contrato</Link>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/visualizador-3d.html" className="hover:underline">3D</Link>
          </div>
        </nav>
      </header>
      {/* Título e subtítulo */}
      {(title || subtitle) && (
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          {title && <h1 className="text-3xl font-bold text-blue-800 mb-2">{title}</h1>}
          {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
        </div>
      )}
      {/* Conteúdo principal */}
      <main className="max-w-4xl mx-auto px-4 pb-12">
        {children}
      </main>
    </div>
  );
} 