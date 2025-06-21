"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <button 
        className="text-white p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
        onClick={toggleMenu}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Menu Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 shadow-xl">
          <div className="max-w-7xl mx-auto px-5 pb-4">
            <div className="flex flex-col gap-2">
              <Link 
                href="/" 
                className="text-white hover:text-blue-100 font-medium px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white hover:bg-opacity-20"
                onClick={() => setIsOpen(false)}
              >
                🏠 Início
              </Link>
              <Link 
                href="/buscar-profissional" 
                className="text-white hover:text-blue-100 font-medium px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white hover:bg-opacity-20"
                onClick={() => setIsOpen(false)}
              >
                🔍 Buscar Profissionais
              </Link>
              <Link 
                href="/cadastro-profissional" 
                className="text-white hover:text-blue-100 font-medium px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white hover:bg-opacity-20"
                onClick={() => setIsOpen(false)}
              >
                👷 Cadastrar-se
              </Link>
              <Link 
                href="/calculadoras" 
                className="text-white hover:text-blue-100 font-medium px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white hover:bg-opacity-20"
                onClick={() => setIsOpen(false)}
              >
                🧮 Calculadoras
              </Link>
              <Link 
                href="/gerador-contrato" 
                className="text-white hover:text-blue-100 font-medium px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white hover:bg-opacity-20"
                onClick={() => setIsOpen(false)}
              >
                📄 Gerador de Contrato
              </Link>
              <Link 
                href="/sobre" 
                className="text-white hover:text-blue-100 font-medium px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white hover:bg-opacity-20"
                onClick={() => setIsOpen(false)}
              >
                ℹ️ Sobre Nós
              </Link>
              <Link 
                href="/blog" 
                className="bg-white text-blue-600 font-semibold px-4 py-3 rounded-xl transition-all duration-300 hover:bg-blue-50"
                onClick={() => setIsOpen(false)}
              >
                📝 Blog
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 