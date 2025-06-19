import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import Link from "next/link";
import { Analytics } from '@vercel/analytics/react';
import MobileMenu from './components/MobileMenu';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ConectaPro - Porto Velho, RO",
  description: "Conectando profissionais da construção com clientes em Porto Velho. Encontre pedreiros, pintores, eletricistas e muito mais.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192x192.png",
    apple: "/icon-192x192.png",
  },
  themeColor: "#2563eb",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ConectaPro" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        {/* Header fixo global premium */}
        <header className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 shadow-xl">
          <div className="max-w-7xl mx-auto px-5">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                <Image 
                  src="/conectapro.png" 
                  alt="Logo ConectaPro" 
                  width={50} 
                  height={50} 
                  className="drop-shadow-lg" 
                />
                <div className="text-white">
                  <div className="font-bold text-xl">ConectaPro</div>
                  <div className="text-blue-100 text-xs">Porto Velho - RO</div>
                </div>
              </Link>
              
              {/* Navegação Desktop */}
              <nav className="hidden md:flex items-center gap-6">
                <Link 
                  href="/" 
                  className="text-white hover:text-blue-100 font-medium px-4 py-2 rounded-full transition-all duration-300 hover:bg-white hover:bg-opacity-20"
                >
                  🏠 Início
                </Link>
                <Link 
                  href="/buscar-profissional" 
                  className="text-white hover:text-blue-100 font-medium px-4 py-2 rounded-full transition-all duration-300 hover:bg-white hover:bg-opacity-20"
                >
                  🔍 Buscar
                </Link>
                <Link 
                  href="/cadastro-profissional" 
                  className="text-white hover:text-blue-100 font-medium px-4 py-2 rounded-full transition-all duration-300 hover:bg-white hover:bg-opacity-20"
                >
                  👷 Cadastrar
                </Link>
                <Link 
                  href="/sobre" 
                  className="text-white hover:text-blue-100 font-medium px-4 py-2 rounded-full transition-all duration-300 hover:bg-white hover:bg-opacity-20"
                >
                  ℹ️ Sobre
                </Link>
                <Link 
                  href="/blog" 
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  📝 Blog
                </Link>
              </nav>

              {/* Menu Mobile */}
              <MobileMenu />
            </div>
          </div>
        </header>

        {/* Espaço para header fixo */}
        <div className="h-16" />
        
        {/* Conteúdo principal */}
        <main>
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 px-5 mt-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Logo e descrição */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <Image 
                    src="/conectapro.png" 
                    alt="Logo ConectaPro" 
                    width={40} 
                    height={40} 
                    className="drop-shadow-lg" 
                  />
                  <div>
                    <div className="font-bold text-lg">ConectaPro</div>
                    <div className="text-gray-300 text-sm">Porto Velho - RO</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  Conectando profissionais da construção com oportunidades de trabalho em Porto Velho.
                </p>
              </div>

              {/* Links */}
              <div className="text-center">
                <h3 className="font-bold mb-4 text-white">Links Úteis</h3>
                <div className="space-y-2">
                  <Link href="/" className="block text-gray-300 hover:text-white transition-colors">
                    Página Inicial
                  </Link>
                  <Link href="/buscar-profissional" className="block text-gray-300 hover:text-white transition-colors">
                    Buscar Profissionais
                  </Link>
                  <Link href="/cadastro-profissional" className="block text-gray-300 hover:text-white transition-colors">
                    Cadastrar-se
                  </Link>
                  <Link href="/sobre" className="block text-gray-300 hover:text-white transition-colors">
                    Sobre Nós
                  </Link>
                </div>
              </div>

              {/* Contato */}
              <div className="text-center md:text-right">
                <h3 className="font-bold mb-4 text-white">Contato</h3>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p>📍 Porto Velho - RO</p>
                  <p>📞 (69) 99999-9999</p>
                  <p>✉️ contato@conectapro.app</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p className="text-gray-400 text-sm">
                © 2024 ConectaPro. Todos os direitos reservados. Feito com ❤️ em Porto Velho.
              </p>
            </div>
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  );
}

// Deploy test - versão atualizada com novo header e blog
// Última atualização: 2024-12-28 14:35 - FORÇAR PRODUÇÃO
