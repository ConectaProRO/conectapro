"use client";
import React from "react";
import Link from "next/link";

interface CalculadoraHeaderProps {
  title: string;
  bgColor: string;
}

export default function CalculadoraHeader({ title, bgColor }: CalculadoraHeaderProps) {
  return (
    <div className={`fixed top-16 left-0 right-0 z-40 ${bgColor} backdrop-blur-lg shadow-lg border-b border-white/20`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <h1 className="text-white font-bold text-lg">{title}</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              href="/calculadoras"
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2"
            >
              🧮 Voltar às Calculadoras
            </Link>
            <Link
              href="/"
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2"
            >
              🏠 ConectaPro
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 