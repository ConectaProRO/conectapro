import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
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
  title: "ConectaPro",
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
        <header className="w-full fixed top-0 left-0 z-10 bg-white/80 backdrop-blur shadow-sm flex justify-center items-center h-20">
          <div className="flex w-full max-w-5xl items-center justify-between px-6">
            <div />
            <Image src="/conectapro.png" alt="Logo ConectaPro" width={72} height={72} className="drop-shadow" />
            <nav>
              <a href="/sobre" className="text-blue-700 hover:text-blue-900 font-semibold text-lg px-4 py-2 rounded transition-colors">Sobre</a>
            </nav>
          </div>
        </header>
        {/* Espaço para header */}
        <div className="h-20" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
