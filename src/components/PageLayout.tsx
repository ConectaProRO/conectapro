import React, { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showBadge?: boolean;
  heroBackground?: string;
  className?: string;
}

export default function PageLayout({
  children,
  title,
  subtitle,
  showBadge = false,
  heroBackground = "from-blue-600 to-blue-700",
  className = ""
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-white ${className}`}>
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

      {/* Badge de Figma (se habilitado) */}
      {showBadge && (
        <div className="fixed top-20 right-4 z-40">
          <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
            🎨 Cores do Figma Ativadas
          </div>
        </div>
      )}

      {/* Header Hero */}
      <header className={`cp-gradient-figma-primary py-12 md:py-16 px-5 text-center text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-blue-600 opacity-10 animate-pulse"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 fade-in-element leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-10 font-light fade-in-element text-blue-100 leading-relaxed px-4 md:px-0">
              {subtitle}
            </p>
          )}
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="py-8 md:py-16 px-4 md:px-5">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
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