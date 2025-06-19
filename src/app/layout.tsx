import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import Link from "next/link";
import { Analytics } from '@vercel/analytics/react';

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
  description: "Encontre e conecte profissionais facilmente.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192x192.png",
    apple: "/icon-192x192.png",
  },
  themeColor: "#3b82f6",
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
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-white to-gray-100 min-h-screen`}
      >
        {/* Header fixo global */}
        <header className="w-full fixed top-0 left-0 z-10 bg-white/90 backdrop-blur shadow-sm flex justify-center items-center h-20">
          <div className="flex w-full max-w-6xl items-center justify-center px-6">
            {/* Logo centralizada */}
            <div className="flex items-center justify-center flex-1">
              <Image src="/conectapro.png" alt="Logo ConectaPro" width={80} height={80} className="drop-shadow" />
            </div>
            
            {/* Navegação abaixo da logo */}
            <nav className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-white/95 backdrop-blur rounded-b-xl shadow-lg px-6 py-2">
              <div className="flex items-center gap-8">
                <Link href="/" className="text-blue-700 hover:text-blue-900 font-semibold text-sm px-3 py-2 rounded transition-colors hover:bg-blue-50">
                  🏠 Início
                </Link>
                <Link href="/sobre" className="text-blue-700 hover:text-blue-900 font-semibold text-sm px-3 py-2 rounded transition-colors hover:bg-blue-50">
                  ℹ️ Sobre
                </Link>
                <Link href="/blog" className="text-blue-700 hover:text-blue-900 font-semibold text-sm px-3 py-2 rounded transition-colors hover:bg-blue-50">
                  📝 Blog
                </Link>
              </div>
            </nav>
          </div>
        </header>
        {/* Espaço para header */}
        <div className="h-28" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

// Deploy test - versão atualizada com novo header e blog
// Última atualização: 2024-12-28 14:30
