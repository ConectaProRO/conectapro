"use client";
import React from "react";
import CalculadoraHeader from "../../components/CalculadoraHeader";

export default function PinturaHubPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CalculadoraHeader title="Calculadoras de Pintura" bgColor="bg-orange-600/90" />
      
      {/* Espaço para header fixo */}
      <div className="h-20" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-orange-600 mb-2 text-center">
            🎨 Calculadoras de Pintura
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Escolha o tipo de acabamento que deseja orçar
          </p>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Selador Acrílico - Em Breve */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-300 rounded-2xl p-6 opacity-75">
              <div className="text-center">
                <div className="text-3xl mb-3">🧴</div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">Selador Acrílico</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Preparação de superfícies
                </p>
                <div className="inline-block bg-gray-400 text-white px-2 py-1 rounded-full text-xs font-bold">
                  Em Breve
                </div>
              </div>
            </div>

            {/* Massa Corrida - Em Breve */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-300 rounded-2xl p-6 opacity-75">
              <div className="text-center">
                <div className="text-3xl mb-3">🏗️</div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">Massa Corrida</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Regularização de paredes
                </p>
                <div className="inline-block bg-gray-400 text-white px-2 py-1 rounded-full text-xs font-bold">
                  Em Breve
                </div>
              </div>
            </div>

            {/* Tinta Textura - Em Breve */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-300 rounded-2xl p-6 opacity-75">
              <div className="text-center">
                <div className="text-3xl mb-3">🎭</div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">Tinta Textura</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Acabamento texturizado
                </p>
                <div className="inline-block bg-gray-400 text-white px-2 py-1 rounded-full text-xs font-bold">
                  Em Breve
                </div>
              </div>
            </div>

            {/* Grafiato - Em Breve */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-300 rounded-2xl p-6 opacity-75">
              <div className="text-center">
                <div className="text-3xl mb-3">🏛️</div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">Grafiato</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Revestimento decorativo
                </p>
                <div className="inline-block bg-gray-400 text-white px-2 py-1 rounded-full text-xs font-bold">
                  Em Breve
                </div>
              </div>
            </div>

            {/* Textura Projetada - Em Breve */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-300 rounded-2xl p-6 opacity-75">
              <div className="text-center">
                <div className="text-3xl mb-3">💨</div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">Textura Projetada</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Aplicação mecânica
                </p>
                <div className="inline-block bg-gray-400 text-white px-2 py-1 rounded-full text-xs font-bold">
                  Em Breve
                </div>
              </div>
            </div>

            {/* Tinta Acrílica - Em Breve */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-300 rounded-2xl p-6 opacity-75">
              <div className="text-center">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">Tinta Acrílica</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Pintura premium
                </p>
                <div className="inline-block bg-gray-400 text-white px-2 py-1 rounded-full text-xs font-bold">
                  Em Breve
                </div>
              </div>
            </div>

            {/* Tinta Látex PVA - Em Breve */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-300 rounded-2xl p-6 opacity-75">
              <div className="text-center">
                <div className="text-3xl mb-3">🖌️</div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">Tinta Látex PVA</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Pintura econômica
                </p>
                <div className="inline-block bg-gray-400 text-white px-2 py-1 rounded-full text-xs font-bold">
                  Em Breve
                </div>
              </div>
            </div>
          </div>

          {/* Informações */}
          <div className="mt-8 bg-orange-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-orange-700 mb-3">💡 Sobre as Calculadoras de Pintura</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-orange-600">
              <ul className="space-y-2">
                <li>• <strong>Selador Acrílico:</strong> Preparação e selagem de superfícies</li>
                <li>• <strong>Massa Corrida:</strong> Correção e nivelamento de paredes</li>
                <li>• <strong>Tinta Textura:</strong> Acabamento com relevo decorativo</li>
                <li>• <strong>Grafiato:</strong> Revestimento com efeito riscado</li>
              </ul>
              <ul className="space-y-2">
                <li>• <strong>Textura Projetada:</strong> Aplicação com equipamento específico</li>
                <li>• <strong>Tinta Acrílica:</strong> Pintura de alta qualidade e durabilidade</li>
                <li>• <strong>Tinta Látex PVA:</strong> Solução econômica para ambientes internos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 