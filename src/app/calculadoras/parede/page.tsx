"use client";
import React from "react";
import Link from "next/link";

import CalculadoraHeader from "../../components/CalculadoraHeader";

export default function ParedeHubPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CalculadoraHeader title="Calculadoras de Parede" bgColor="bg-red-600/90" />
      
      {/* Espaço para header fixo */}
      <div className="h-20" />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-red-600 mb-2 text-center">
            🧱 Calculadoras de Parede
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Escolha o tipo de serviço de parede que deseja orçar
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Alvenaria - Ativo */}
            <Link href="/calculadoras/parede/alvenaria" className="block">
              <div className="group bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-300 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🧱</div>
                  <h3 className="text-xl font-bold text-green-700 mb-2">Alvenaria</h3>
                  <p className="text-sm text-green-600 mb-3">
                    Construção de paredes com tijolos
                  </p>
                  <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Disponível
                  </div>
                </div>
              </div>
            </Link>

            {/* Bloco Estrutural - Em Breve */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-300 rounded-2xl p-6 opacity-75">
              <div className="text-center">
                <div className="text-4xl mb-4">🔳</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Bloco Estrutural</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Construção com blocos de concreto
                </p>
                <div className="inline-block bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Em Breve
                </div>
              </div>
            </div>

            {/* Reboco - Em Breve */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-300 rounded-2xl p-6 opacity-75">
              <div className="text-center">
                <div className="text-4xl mb-4">🏗️</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Reboco</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Revestimento de paredes
                </p>
                <div className="inline-block bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Em Breve
                </div>
              </div>
            </div>
          </div>

          {/* Informações */}
          <div className="mt-8 bg-red-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-red-700 mb-3">💡 Sobre as Calculadoras de Parede</h3>
            <ul className="text-sm text-red-600 space-y-2">
              <li>• <strong>Alvenaria:</strong> Construção de paredes com tijolos cerâmicos</li>
              <li>• <strong>Bloco Estrutural:</strong> Sistema construtivo com blocos de concreto</li>
              <li>• <strong>Reboco:</strong> Revestimento e acabamento de paredes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 