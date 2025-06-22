import React, { ReactNode } from 'react';
import Link from "next/link";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showBreadcrumb?: boolean;
  showBadge?: boolean;
  heroBackground?: string;
  className?: string;
}

export default function PageLayout({
  children,
  title,
  subtitle,
  showBreadcrumb = true,
  showBadge = false,
  heroBackground = "from-blue-600 to-blue-700",
  className = ""
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 ${className}`}>
      {/* CSS personalizado para animações */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease forwards;
        }
        
        .fade-in-element {
          opacity: 1;
          transform: translateY(0);
        }
        
        html {
          scroll-behavior: smooth;
        }

        .cp-gradient-figma-primary {
          background: linear-gradient(135deg, var(--figma-color-1), var(--figma-color-5));
        }
        
        .cp-gradient-figma-secondary {
          background: linear-gradient(135deg, var(--figma-color-2), var(--figma-color-4));
        }

        .cp-card-modern {
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          padding: 2rem;
          margin-bottom: 3rem;
          border: 1px solid rgba(37, 99, 235, 0.1);
          transition: all 0.3s ease;
        }

        .cp-card-modern:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .cp-button-primary {
          background: var(--figma-color-1);
          color: white;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .cp-button-primary:hover {
          background: var(--figma-color-5);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.4);
        }

        .cp-button-secondary {
          background: var(--figma-color-2);
          color: var(--figma-color-1);
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: 2px solid var(--figma-color-1);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .cp-button-secondary:hover {
          background: var(--figma-color-1);
          color: white;
          transform: translateY(-2px);
        }

        .cp-text-gradient {
          background: linear-gradient(135deg, var(--figma-color-1), var(--figma-color-5));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cp-border-figma {
          border: 2px solid var(--figma-color-2);
        }

        .cp-bg-figma-light {
          background: var(--figma-color-2);
        }
      `}</style>

      {/* Navegação Rápida Fixa */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col gap-3">
          {/* Botão Voltar ao Início */}
          <Link 
            href="/" 
            className="group bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            title="Voltar ao Início"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>
          
          {/* Menu de Páginas Rápidas */}
          <div className="relative group">
            <button className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            
            {/* Menu dropdown */}
            <div className="absolute bottom-full right-0 mb-2 w-56 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-200">
              <div className="p-3">
                <h3 className="font-bold text-gray-900 mb-3 text-sm">Navegação Rápida</h3>
                <div className="space-y-1">
                  <Link href="/buscar-profissional" className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                    <span>🔍</span>
                    <span className="text-gray-700 hover:text-blue-600">Buscar Profissionais</span>
                  </Link>
                  <Link href="/calculadoras" className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                    <span>🧮</span>
                    <span className="text-gray-700 hover:text-blue-600">Calculadoras</span>
                  </Link>
                  <Link href="/precos-cub" className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                    <span>💰</span>
                    <span className="text-gray-700 hover:text-blue-600">Preços CUB</span>
                  </Link>
                  <Link href="/gerador-contrato" className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                    <span>📄</span>
                    <span className="text-gray-700 hover:text-blue-600">Contrato</span>
                  </Link>
                  <Link href="/blog" className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                    <span>📝</span>
                    <span className="text-gray-700 hover:text-blue-600">Blog</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      {showBreadcrumb && (
        <div className="bg-white border-b border-gray-200 py-3">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                ConectaPro
              </Link>
              <span className="text-gray-400">›</span>
              <span className="text-gray-600">{title || 'Página'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      {title && (
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
            {showBadge && (
              <div className="mt-6">
                <span className="inline-block px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium">
                  🎨 Cores do Figma Ativadas
                </span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </div>
    </div>
  );
}

// Componente de Card padronizado
export function PageCard({ 
  children, 
  className = "",
  fadeIn = true 
}: { 
  children: ReactNode; 
  className?: string;
  fadeIn?: boolean;
}) {
  return (
    <div className={`cp-card-modern ${fadeIn ? 'fade-in-element' : ''} ${className}`}>
      {children}
    </div>
  );
}

// Componente de Botão padronizado
export function PageButton({ 
  children, 
  variant = "primary",
  onClick,
  href,
  className = ""
}: { 
  children: ReactNode; 
  variant?: "primary" | "secondary";
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const baseClass = variant === "primary" ? "cp-button-primary" : "cp-button-secondary";
  
  if (href) {
    return (
      <a href={href} className={`${baseClass} ${className}`}>
        {children}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={`${baseClass} ${className}`}>
      {children}
    </button>
  );
} 