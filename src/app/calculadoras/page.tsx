"use client";
import React from "react";
import Link from "next/link";
import { FaHammer, FaPaintBrush, FaPlug, FaHome, FaCubes } from "react-icons/fa";

export const metadata = {
  title: "Calculadoras de Construção Civil SINAPI - Porto Velho | ConectaPro",
  description: "Calculadoras gratuitas baseadas em SINAPI para orçamento de obras: concreto, piso, parede, pintura, instalações e forro de gesso. Valores atualizados para Porto Velho-RO!",
  keywords: "calculadora sinapi, orçamento construção porto velho, calculadora concreto, calculadora piso, calculadora pintura, preços construção civil",
};

export default function CalculadorasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">ConectaPro</h1>
          <p className="text-center text-white/90 text-lg">Calculadoras de Construção</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Calculadoras Disponíveis */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Calculadoras Disponíveis</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {/* Concreto */}
            <Link href="/calculadoras/concreto" className="flex flex-col items-center group">
              <div className="calculadora-card relative bg-red-500 hover:bg-red-600 rounded-full w-20 h-20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg">
                <FaCubes className="text-white text-2xl" />
                <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  Ativo
                </div>
              </div>
              <div className="mt-3 font-semibold text-gray-700 text-center text-sm">Concreto</div>
            </Link>

            {/* Piso */}
            <Link href="/calculadoras/piso" className="flex flex-col items-center group">
              <div className="calculadora-card relative bg-red-500 hover:bg-red-600 rounded-full w-20 h-20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg">
                <FaCubes className="text-white text-2xl" />
                <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  Ativo
                </div>
              </div>
              <div className="mt-3 font-semibold text-gray-700 text-center text-sm">Piso</div>
            </Link>

            {/* Parede */}
            <Link href="/calculadoras/parede" className="flex flex-col items-center group">
              <div className="calculadora-card relative bg-red-500 hover:bg-red-600 rounded-full w-20 h-20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg">
                <FaHammer className="text-white text-2xl" />
                <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  Ativo
                </div>
              </div>
              <div className="mt-3 font-semibold text-gray-700 text-center text-sm">Parede</div>
            </Link>

            {/* Instalações */}
            <Link href="/calculadoras/instalacoes" className="flex flex-col items-center group">
              <div className="calculadora-card relative bg-red-500 hover:bg-red-600 rounded-full w-20 h-20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg">
                <FaPlug className="text-white text-2xl" />
                <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  Ativo
                </div>
              </div>
              <div className="mt-3 font-semibold text-gray-700 text-center text-sm">Instalações</div>
            </Link>

            {/* Pintura */}
            <Link href="/calculadoras/pintura" className="flex flex-col items-center group">
              <div className="calculadora-card relative bg-red-500 hover:bg-red-600 rounded-full w-20 h-20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg">
                <FaPaintBrush className="text-white text-2xl" />
                <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  Ativo
                </div>
              </div>
              <div className="mt-3 font-semibold text-gray-700 text-center text-sm">Pintura</div>
            </Link>

            {/* Forro de Gesso */}
            <Link href="/calculadoras/forro-gesso" className="flex flex-col items-center group">
              <div className="calculadora-card relative bg-red-500 hover:bg-red-600 rounded-full w-20 h-20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg">
                <FaHome className="text-white text-2xl" />
                <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  Ativo
                </div>
              </div>
              <div className="mt-3 font-semibold text-gray-700 text-center text-sm">Forro de Gesso</div>
            </Link>
          </div>
        </div>

        {/* Informações */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            📊 Sobre as Calculadoras ConectaPro
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-lg text-red-600 mb-3">🏛️ SINAPI Oficial</h4>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Composições técnicas oficiais da Caixa Econômica Federal</li>
                <li>• Valores com encargos sociais completos</li>
                <li>• Coeficientes e especificações técnicas detalhadas</li>
                <li>• Ideal para obras públicas e projetos técnicos</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg text-green-600 mb-3">🏪 Mercado Local</h4>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Valores praticados por profissionais autônomos</li>
                <li>• Materiais em unidades práticas de compra</li>
                <li>• Preços ajustados para a realidade do mercado</li>
                <li>• Ideal para obras particulares e reformas</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Integração ConectaPro */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">🔗 Integração ConectaPro</h3>
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Precisa de profissionais qualificados para executar seu projeto?
            </p>
            <Link 
              href="/buscar-profissional" 
              className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              🏠 Encontrar Profissionais no ConectaPro
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 