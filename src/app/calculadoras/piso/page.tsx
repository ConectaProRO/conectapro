"use client";
import React from "react";
import Link from "next/link";
import CalculadoraHeader from "../../components/CalculadoraHeader";

export default function PisoHubPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CalculadoraHeader title="Calculadoras de Piso" bgColor="bg-purple-600/90" />
      
      {/* Espaço para header fixo */}
      <div className="h-20" />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-purple-600 mb-2 text-center">
            🔧 Calculadoras de Piso
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Escolha o tipo de serviço de piso que deseja orçar
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Contra-Piso - Ativo */}
            <Link 
              href="/calculadoras/contra-piso"
              className="group bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-300 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">⬜</div>
                <h3 className="text-xl font-bold text-green-700 mb-2">Contra-Piso</h3>
                <p className="text-sm text-green-600 mb-3">
                  Base para revestimentos cerâmicos
                </p>
                <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Disponível
                </div>
              </div>
            </Link>

            {/* Cerâmica - Em Breve */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-300 rounded-2xl p-6 opacity-75">
              <div className="text-center">
                <div className="text-4xl mb-4">🔲</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Cerâmica</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Assentamento de pisos cerâmicos
                </p>
                <div className="inline-block bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Em Breve
                </div>
              </div>
            </div>

            {/* Porcelanato - Em Breve */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-300 rounded-2xl p-6 opacity-75">
              <div className="text-center">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Porcelanato</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Assentamento de porcelanato
                </p>
                <div className="inline-block bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Em Breve
                </div>
              </div>
            </div>
          </div>

          {/* Informações */}
          <div className="mt-8 bg-purple-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-purple-700 mb-3">💡 Sobre as Calculadoras de Piso</h3>
            <ul className="text-sm text-purple-600 space-y-2">
              <li>• <strong>Contra-Piso:</strong> Base nivelada para receber revestimentos cerâmicos</li>
              <li>• <strong>Cerâmica:</strong> Assentamento de pisos cerâmicos com argamassa colante</li>
              <li>• <strong>Porcelanato:</strong> Instalação de porcelanato com técnicas específicas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 