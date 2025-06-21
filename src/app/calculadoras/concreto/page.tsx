"use client";
import React from "react";
import CalculadoraHeader from "../../components/CalculadoraHeader";

export default function ConcretoHubPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CalculadoraHeader title="Calculadoras de Concreto" bgColor="bg-gray-600/90" />
      
      {/* Espaço para header fixo */}
      <div className="h-20" />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-600 mb-2 text-center">
            🏗️ Calculadoras de Concreto
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Escolha o tipo de estrutura de concreto que deseja orçar
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Fundação - Em Breve */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-300 rounded-2xl p-6 opacity-75">
              <div className="text-center">
                <div className="text-4xl mb-4">🏗️</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Fundação</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Sapatas e blocos de fundação
                </p>
                <div className="inline-block bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Em Breve
                </div>
              </div>
            </div>

            {/* Viga - Em Breve */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-300 rounded-2xl p-6 opacity-75">
              <div className="text-center">
                <div className="text-4xl mb-4">📏</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Viga</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Vigas de concreto armado
                </p>
                <div className="inline-block bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Em Breve
                </div>
              </div>
            </div>

            {/* Pilar - Em Breve */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-300 rounded-2xl p-6 opacity-75">
              <div className="text-center">
                <div className="text-4xl mb-4">🏛️</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Pilar</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Pilares de concreto armado
                </p>
                <div className="inline-block bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Em Breve
                </div>
              </div>
            </div>

            {/* Laje - Em Breve */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-300 rounded-2xl p-6 opacity-75">
              <div className="text-center">
                <div className="text-4xl mb-4">▬</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Laje</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Lajes de concreto armado
                </p>
                <div className="inline-block bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Em Breve
                </div>
              </div>
            </div>
          </div>

          {/* Informações */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">💡 Sobre as Calculadoras de Concreto</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• <strong>Fundação:</strong> Elementos de base das construções</li>
              <li>• <strong>Viga:</strong> Elementos horizontais de sustentação</li>
              <li>• <strong>Pilar:</strong> Elementos verticais de sustentação</li>
              <li>• <strong>Laje:</strong> Elementos de cobertura e separação de pavimentos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 