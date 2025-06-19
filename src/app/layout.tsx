import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Image from "next/image";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
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
      </body>
    </html>
  );
}
