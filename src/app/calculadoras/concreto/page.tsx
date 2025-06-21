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
            {/* Fundação - ATIVO */}
            <a href="/calculadoras/concreto/fundacao" className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl p-6 hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div className="text-center">
                <div className="text-4xl mb-4">🏗️</div>
                <h3 className="text-xl font-bold mb-2">Fundação</h3>
                <p className="text-sm opacity-90 mb-3">
                  Sapatas, blocos e vigas baldrame (SINAPI)
                </p>
                <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  ✅ Ativo
                </div>
              </div>
            </a>

            {/* Viga - ATIVO */}
            <a href="/calculadoras/concreto/viga" className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div className="text-center">
                <div className="text-4xl mb-4">📏</div>
                <h3 className="text-xl font-bold mb-2">Viga</h3>
                <p className="text-sm opacity-90 mb-3">
                  Formas para vigas de concreto armado (SINAPI)
                </p>
                <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  ✅ Ativo
                </div>
              </div>
            </a>

            {/* Pilar - ATIVO */}
            <a href="/calculadoras/concreto/pilar" className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div className="text-center">
                <div className="text-4xl mb-4">🏛️</div>
                <h3 className="text-xl font-bold mb-2">Pilar</h3>
                <p className="text-sm opacity-90 mb-3">
                  Formas para pilares de concreto armado (SINAPI)
                </p>
                <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  ✅ Ativo
                </div>
              </div>
            </a>

            {/* Piso - ATIVO */}
            <a href="/calculadoras/concreto/piso" className="bg-gradient-to-br from-slate-500 to-slate-600 text-white rounded-2xl p-6 hover:from-slate-600 hover:to-slate-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <div className="text-center">
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-xl font-bold mb-2">Piso</h3>
                <p className="text-sm opacity-90 mb-3">
                  Passeios e pisos de concreto armado (SINAPI)
                </p>
                <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  ✅ Ativo
                </div>
              </div>
            </a>
          </div>

          {/* Informações */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">💡 Sobre as Calculadoras de Concreto</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• <strong>Fundação:</strong> Elementos de base das construções</li>
              <li>• <strong>Viga:</strong> Elementos horizontais de sustentação</li>
              <li>• <strong>Pilar:</strong> Elementos verticais de sustentação</li>
              <li>• <strong>Piso:</strong> Elementos de pavimentação em concreto</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 