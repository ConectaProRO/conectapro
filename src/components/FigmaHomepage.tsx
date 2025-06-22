import React from 'react';
import Link from 'next/link';

export default function FigmaHomepage() {
  return (
    <div className="figma-homepage">
      {/* HomePage ConectaPro - Generated from Figma */}
      <section className="figma-section bg-white" style={{width: 1440, height: 1024}}>
        <div className="container max-w-6xl mx-auto px-4">
          {/* Content for HomePage ConectaPro */}
          <div className="min-h-screen flex items-center justify-center text-center">
            <div>
              <h1 className="text-5xl font-bold mb-4 text-gray-900">
                ConectaPro
              </h1>
              <p className="text-xl mb-8 text-gray-600 opacity-80">
                Conectando profissionais com oportunidades
              </p>
              <div className="flex gap-4 justify-center">
                <Link 
                  href="/buscar-profissional"
                  className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 cp-button-primary"
                >
                  Buscar Profissional
                </Link>
                <Link 
                  href="/cadastro-profissional"
                  className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Sou Profissional
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
