"use client";
import React from "react";
import CalculadoraHeader from "../../components/CalculadoraHeader";

export default function InstalacoesHubPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CalculadoraHeader title="Calculadoras de Instalações" bgColor="bg-blue-600/90" />
      
      {/* Espaço para header fixo */}
      <div className="h-20" />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-2 text-center">
            🔧 Calculadoras de Instalações
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Escolha o tipo de instalação que deseja orçar
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Instalação Hidráulica - Em Breve */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-300 rounded-2xl p-6 opacity-75">
              <div className="text-center">
                <div className="text-4xl mb-4">🚿</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Instalação Hidráulica</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Água fria e quente
                </p>
                <div className="inline-block bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Em Breve
                </div>
              </div>
            </div>

            {/* Instalação Esgoto - Em Breve */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-300 rounded-2xl p-6 opacity-75">
              <div className="text-center">
                <div className="text-4xl mb-4">🚽</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Instalação Esgoto</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Rede de esgoto sanitário
                </p>
                <div className="inline-block bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Em Breve
                </div>
              </div>
            </div>

            {/* Instalação Elétrica - Em Breve */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-300 rounded-2xl p-6 opacity-75">
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Instalação Elétrica</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Pontos elétricos e iluminação
                </p>
                <div className="inline-block bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Em Breve
                </div>
              </div>
            </div>
          </div>

          {/* Informações */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-700 mb-3">💡 Sobre as Calculadoras de Instalações</h3>
            <ul className="text-sm text-blue-600 space-y-2">
              <li>• <strong>Hidráulica:</strong> Tubulações de água fria e quente</li>
              <li>• <strong>Esgoto:</strong> Sistema de coleta e tratamento de efluentes</li>
              <li>• <strong>Elétrica:</strong> Circuitos elétricos, tomadas e iluminação</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 