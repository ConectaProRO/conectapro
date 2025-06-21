"use client";
import React, { useState } from "react";
import CalculadoraHeader from "../../components/CalculadoraHeader";

export default function ForroGessoPage() {
  const [area, setArea] = useState("");
  const [tipoForro, setTipoForro] = useState("liso");
  const [resultado, setResultado] = useState<{
    area: number;
    tipo: string;
    fator: number;
    sinapi: {
      maoDeObra: number;
      materiais: number;
      total: number;
    };
    mercado: {
      maoDeObra: number;
      materiais: number;
      total: number;
    };
  } | null>(null);

  const precos = {
    sinapi: {
      maoDeObra: [
        { item: "Gesseiro", codigo: "88316", unidade: "H", coeficiente: 0.8, preco: 30.21 },
        { item: "Servente", codigo: "88316", unidade: "H", coeficiente: 0.4, preco: 25.95 }
      ],
      materiais: [
        { item: "Gesso em pó 20kg", codigo: "01234", unidade: "SC", coeficiente: 1.2, preco: 18.00 },
        { item: "Arame galvanizado", codigo: "05678", unidade: "KG", coeficiente: 0.05, preco: 12.00 }
      ]
    },
    mercado: {
      maoDeObra: { min: 18, max: 30 },
      materiais: [
        { item: "Gesso em pó 20kg", quantidade: 1.2, preco: 18.00, unidade: "saco" },
        { item: "Arame galvanizado", quantidade: 0.05, preco: 12.00, unidade: "kg" },
        { item: "Prego", quantidade: 0.02, preco: 8.00, unidade: "kg" }
      ]
    }
  };

  const fatores = {
    liso: 1.0,
    decorativo: 1.4,
    sanca: 1.8
  };

  const calcular = () => {
    const areaNum = parseFloat(area);
    if (!areaNum || areaNum <= 0) {
      alert("Por favor, insira uma área válida!");
      return;
    }

    const fator = fatores[tipoForro as keyof typeof fatores];
    
    // Cálculo SINAPI
    const maoObraSinapi = precos.sinapi.maoDeObra.reduce((total, item) => {
      return total + (item.coeficiente * item.preco * areaNum * fator);
    }, 0);

    const materiaisSinapi = precos.sinapi.materiais.reduce((total, item) => {
      return total + (item.coeficiente * item.preco * areaNum * fator);
    }, 0);

    const totalSinapi = maoObraSinapi + materiaisSinapi;

    // Cálculo Mercado
    const maoObraMercado = ((precos.mercado.maoDeObra.min + precos.mercado.maoDeObra.max) / 2) * areaNum * fator;
    
    const materiaisMercado = precos.mercado.materiais.reduce((total, item) => {
      return total + (item.quantidade * item.preco * areaNum * fator);
    }, 0);

    const totalMercado = maoObraMercado + materiaisMercado;

    setResultado({
      area: areaNum,
      tipo: tipoForro,
      fator,
      sinapi: {
        maoDeObra: maoObraSinapi,
        materiais: materiaisSinapi,
        total: totalSinapi
      },
      mercado: {
        maoDeObra: maoObraMercado,
        materiais: materiaisMercado,
        total: totalMercado
      }
    });
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CalculadoraHeader title="Calculadora - Forro de Gesso" bgColor="bg-purple-600/90" />
      
      {/* Espaço para header fixo */}
      <div className="h-20" />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Formulário */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">
            🏠 Calculadora de Forro de Gesso
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Área (m²):
              </label>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Ex: 25.5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && calcular()}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Tipo de Forro:
              </label>
              <select
                value={tipoForro}
                onChange={(e) => setTipoForro(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="liso">Liso (Fator 1.0)</option>
                <option value="decorativo">Decorativo (Fator 1.4)</option>
                <option value="sanca">Com Sanca (Fator 1.8)</option>
              </select>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={calcular}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              🧮 Calcular Orçamento
            </button>
          </div>
        </div>

        {/* Resultados */}
        {resultado && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              📊 Resultado do Orçamento
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* SINAPI */}
              <div className="bg-red-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-red-600 mb-4 text-center">
                  🏛️ SINAPI Oficial
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Mão de Obra:</span>
                    <span className="font-semibold">{formatarMoeda(resultado.sinapi.maoDeObra)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Materiais:</span>
                    <span className="font-semibold">{formatarMoeda(resultado.sinapi.materiais)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-red-600">
                      <span>Total:</span>
                      <span>{formatarMoeda(resultado.sinapi.total)}</span>
                    </div>
                    <div className="text-sm text-gray-600 text-center mt-2">
                      {formatarMoeda(resultado.sinapi.total / resultado.area)}/m²
                    </div>
                  </div>
                </div>
              </div>

              {/* Mercado Local */}
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-green-600 mb-4 text-center">
                  🏪 Mercado Local
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Mão de Obra:</span>
                    <span className="font-semibold">{formatarMoeda(resultado.mercado.maoDeObra)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Materiais:</span>
                    <span className="font-semibold">{formatarMoeda(resultado.mercado.materiais)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-green-600">
                      <span>Total:</span>
                      <span>{formatarMoeda(resultado.mercado.total)}</span>
                    </div>
                    <div className="text-sm text-gray-600 text-center mt-2">
                      {formatarMoeda(resultado.mercado.total / resultado.area)}/m²
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resumo */}
            <div className="mt-8 bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-3">📋 Resumo do Projeto</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Área:</span>
                  <div className="font-semibold">{resultado.area} m²</div>
                </div>
                <div>
                  <span className="text-gray-600">Tipo:</span>
                  <div className="font-semibold capitalize">{resultado.tipo}</div>
                </div>
                <div>
                  <span className="text-gray-600">Fator:</span>
                  <div className="font-semibold">{resultado.fator}</div>
                </div>
                <div>
                  <span className="text-gray-600">Diferença:</span>
                  <div className="font-semibold">
                    {formatarMoeda(Math.abs(resultado.sinapi.total - resultado.mercado.total))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 