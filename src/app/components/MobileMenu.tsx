"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
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

  const menuItems = [
    { href: "/", icon: "🏠", title: "Início", description: "Página principal" },
    { href: "/buscar-profissional", icon: "🔍", title: "Buscar Profissionais", description: "Encontre especialistas" },
    { href: "/cadastro-profissional", icon: "👷", title: "Cadastrar-se", description: "Ofereça seus serviços" },
    { href: "/calculadoras", icon: "🧮", title: "Calculadoras", description: "Ferramentas de cálculo" },
    { href: "/precos-cub", icon: "💰", title: "Preços CUB", description: "Custos da construção" },
    { href: "/gerador-contrato", icon: "📄", title: "Gerador de Contrato", description: "Criar contratos" },

    { href: "/blog", icon: "📝", title: "Blog", description: "Artigos e dicas" },
    { href: "/sobre", icon: "ℹ️", title: "Sobre", description: "Conheça a ConectaPro" },
    { href: "/admin", icon: "⚙️", title: "Admin", description: "Painel administrativo" }
  ];

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
          onClick={closeMenu}
        />
      )}

      {/* Menu Mobile Fullscreen */}
      <div className={`
        fixed inset-0 z-50 
        bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}>
        <div className="h-full overflow-y-auto">
          {/* Header do Menu */}
          <div className="flex items-center justify-between p-6 border-b border-white border-opacity-20">
            <div className="text-white">
              <h2 className="text-xl font-bold">ConectaPro</h2>
              <p className="text-blue-100 text-sm">Navegação</p>
            </div>
            <button 
              onClick={closeMenu}
              className="text-white hover:text-blue-100 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links do Menu */}
          <div className="p-6">
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="group flex items-center gap-4 text-white hover:text-blue-100 font-medium p-4 rounded-xl transition-all duration-300 hover:bg-white hover:bg-opacity-20 transform hover:scale-105"
                  onClick={closeMenu}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{item.title}</div>
                    <div className="text-blue-100 text-sm opacity-80 truncate">{item.description}</div>
                  </div>
                  <svg className="w-5 h-5 text-blue-100 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

            {/* Seção de Contato */}
            <div className="mt-8 pt-6 border-t border-white border-opacity-20">
              <h3 className="text-white font-semibold mb-4">Contato</h3>
              <div className="space-y-2 text-blue-100 text-sm">
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>Porto Velho - RO</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📞</span>
                  <span>(69) 99256-1830</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✉️</span>
                  <span>conectaproro@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Botão de Ação */}
            <div className="mt-6">
              <Link 
                href="/cadastro-profissional"
                onClick={closeMenu}
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-xl text-center transition-all duration-300 transform hover:scale-105"
              >
                🚀 Cadastrar-se Gratuitamente
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 