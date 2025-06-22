"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Fechar menu ao clicar fora ou pressionar ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest('.mobile-menu-container')) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      // Prevenir scroll do body quando menu estiver aberto
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden mobile-menu-container">
      {/* Botão Hamburger */}
      <button 
        className={`text-white p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300 ${isOpen ? 'bg-white bg-opacity-20' : ''}`}
        onClick={toggleMenu}
        aria-label="Menu de navegação"
        aria-expanded={isOpen}
      >
        <svg 
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay escuro */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Mobile Dropdown */}
      <div className={`
        fixed top-16 left-0 right-0 z-50 
        bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 
        shadow-2xl border-t border-blue-500 border-opacity-30
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}>
        <div className="max-w-7xl mx-auto px-5 py-6">
          {/* Título do Menu */}
          <div className="text-center mb-6">
            <h2 className="text-white font-bold text-lg">Navegação</h2>
            <div className="w-16 h-0.5 bg-white bg-opacity-50 mx-auto mt-2"></div>
          </div>

          {/* Links principais */}
          <div className="grid grid-cols-1 gap-3 mb-6">
            <Link 
              href="/" 
              className="group flex items-center gap-4 text-white hover:text-blue-100 font-medium px-4 py-4 rounded-xl transition-all duration-300 hover:bg-white hover:bg-opacity-20 hover:transform hover:scale-105"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">🏠</span>
              <div>
                <div className="font-semibold">Início</div>
                <div className="text-blue-100 text-sm opacity-80">Página principal</div>
              </div>
            </Link>

            <Link 
              href="/buscar-profissional" 
              className="group flex items-center gap-4 text-white hover:text-blue-100 font-medium px-4 py-4 rounded-xl transition-all duration-300 hover:bg-white hover:bg-opacity-20 hover:transform hover:scale-105"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">🔍</span>
              <div>
                <div className="font-semibold">Buscar Profissionais</div>
                <div className="text-blue-100 text-sm opacity-80">Encontre especialistas</div>
              </div>
            </Link>

            <Link 
              href="/cadastro-profissional" 
              className="group flex items-center gap-4 text-white hover:text-blue-100 font-medium px-4 py-4 rounded-xl transition-all duration-300 hover:bg-white hover:bg-opacity-20 hover:transform hover:scale-105"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">👷</span>
              <div>
                <div className="font-semibold">Cadastrar-se</div>
                <div className="text-blue-100 text-sm opacity-80">Ofereça seus serviços</div>
              </div>
            </Link>
          </div>

          {/* Divisor */}
          <div className="border-t border-white border-opacity-20 my-6"></div>

          {/* Ferramentas */}
          <div className="mb-6">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-3 opacity-80">Ferramentas</h3>
            <div className="grid grid-cols-1 gap-2">
              <Link 
                href="/calculadoras" 
                className="flex items-center gap-3 text-white hover:text-blue-100 font-medium px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white hover:bg-opacity-20"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">🧮</span>
                <span>Calculadoras</span>
              </Link>

              <Link 
                href="/precos-cub" 
                className="flex items-center gap-3 text-white hover:text-blue-100 font-medium px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white hover:bg-opacity-20"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">💰</span>
                <span>Preços CUB</span>
              </Link>

              <Link 
                href="/gerador-contrato" 
                className="flex items-center gap-3 text-white hover:text-blue-100 font-medium px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white hover:bg-opacity-20"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">📄</span>
                <span>Gerador de Contrato</span>
              </Link>

              <Link 
                href="/orcamento-3d" 
                className="flex items-center gap-3 text-white hover:text-blue-100 font-medium px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white hover:bg-opacity-20"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">🎯</span>
                <span>Orçamento 3D</span>
              </Link>
            </div>
          </div>

          {/* Divisor */}
          <div className="border-t border-white border-opacity-20 my-6"></div>

          {/* Links secundários */}
          <div className="grid grid-cols-2 gap-3">
            <Link 
              href="/blog" 
              className="flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold px-4 py-3 rounded-xl transition-all duration-300 hover:bg-blue-50 hover:transform hover:scale-105"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">📝</span>
              <span>Blog</span>
            </Link>

            <Link 
              href="/sobre" 
              className="flex items-center justify-center gap-2 text-white hover:text-blue-100 font-medium px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white hover:bg-opacity-20"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">ℹ️</span>
              <span>Sobre</span>
            </Link>
          </div>

          {/* Informações de contato */}
          <div className="mt-6 pt-6 border-t border-white border-opacity-20 text-center">
            <div className="text-white text-sm opacity-80 mb-2">
              📍 Porto Velho - RO
            </div>
            <div className="text-white text-sm opacity-80">
              📞 (69) 99256-1830
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 