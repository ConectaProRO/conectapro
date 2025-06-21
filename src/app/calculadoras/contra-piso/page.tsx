"use client";
import React, { useState } from "react";
import CalculadoraHeader from "../../components/CalculadoraHeader";

export default function ContraPisoPage() {
  const [area, setArea] = useState("");
  const [modalidade, setModalidade] = useState("mercado");
  const [resultado, setResultado] = useState<{
    area: number;
    modalidade: string;
    maoObra: {
      pedreiro: { horas: number; valor: number; descricao: string };
      servente: { horas: number; valor: number; descricao: string };
      total: number;
    };
    materiais: {
      componentes: Array<{
        nome: string;
        qtd: number;
        unidade: string;
        valor: number;
        tipo: string;
      }>;
      total: number;
    };
    total: number;
    valorPorM2: number;
  } | null>(null);

  const modalidades = {
    sinapi: {
      nome: "SINAPI Oficial (Caixa Econômica)",
      composicao: {
        pedreiro: { descricao: "Pedreiro com Encargos", valor_hora: 27.80, coeficiente: 0.285 },
        servente: { descricao: "Servente com Encargos", valor_hora: 23.98, coeficiente: 0.142 },
        argamassa: { descricao: "Argamassa Traço 1:4 (Cimento e Areia)", valor_m3: 962.37, coeficiente: 0.0607 }
      }
    },
    mercado: {
      nome: "Mercado Local (Profissionais Autônomos)",
      composicao: {
        pedreiro: { descricao: "Pedreiro", valor_hora: 25.00, coeficiente: 0.30 },
        servente: { descricao: "Servente", valor_hora: 18.00, coeficiente: 0.15 },
        cimento: { descricao: "Cimento Portland CP II-32", valor_kg: 1.20, coeficiente: 27.62 },
        areia: { descricao: "Areia Média", valor_m3: 150.00, coeficiente: 0.082 }
      }
    }
  };

  const calcular = () => {
    const areaNum = parseFloat(area);
    if (!areaNum || areaNum <= 0) {
      alert("Por favor, informe a área do contra-piso!");
      return;
    }

    const dados = modalidades[modalidade as keyof typeof modalidades];
    const comp = dados.composicao;

    // Cálculos da mão de obra
    const pedreiroHoras = areaNum * comp.pedreiro.coeficiente;
    const serventeHoras = areaNum * comp.servente.coeficiente;
    const pedreiroValor = pedreiroHoras * comp.pedreiro.valor_hora;
    const serventeValor = serventeHoras * comp.servente.valor_hora;

    let componentes: Array<{
      nome: string;
      qtd: number;
      unidade: string;
      valor: number;
      tipo: string;
    }> = [];
    let totalMateriais = 0;

    if (modalidade === 'sinapi') {
      // Modalidade SINAPI - usar argamassa pronta
      const argamassaQuantidade = areaNum * (comp as Record<string, any>).argamassa.coeficiente;
      const argamassaValor = argamassaQuantidade * (comp as Record<string, any>).argamassa.valor_m3;
      
      totalMateriais = argamassaValor;
      
              componentes = [
          { 
            nome: (comp as Record<string, any>).argamassa.descricao, 
            qtd: argamassaQuantidade, 
            unidade: 'm³', 
            valor: argamassaValor, 
            tipo: 'material' 
          }
        ];
    } else {
      // Modalidade mercado local - materiais decompostos
      const cimentoQuantidade = areaNum * (comp as Record<string, any>).cimento.coeficiente;
      const areiaQuantidade = areaNum * (comp as Record<string, any>).areia.coeficiente;
      
      const cimentoValor = cimentoQuantidade * (comp as Record<string, any>).cimento.valor_kg;
      const areiaValor = areiaQuantidade * (comp as Record<string, any>).areia.valor_m3;
      
      totalMateriais = cimentoValor + areiaValor;
      
      // Converter para unidades práticas de compra
      const cimentoSacos = cimentoQuantidade / 50; // 50kg por saco
      
              componentes = [
          { 
            nome: (comp as Record<string, any>).cimento.descricao, 
            qtd: cimentoSacos, 
            unidade: 'sacos 50kg', 
            valor: cimentoValor, 
            tipo: 'material' 
          },
          { 
            nome: (comp as Record<string, any>).areia.descricao, 
            qtd: areiaQuantidade, 
            unidade: 'm³', 
            valor: areiaValor, 
            tipo: 'material' 
          }
        ];
    }

    // Calcular totais
    const totalMaoObra = pedreiroValor + serventeValor;
    const totalGeral = totalMaoObra + totalMateriais;
    const valorPorM2 = totalGeral / areaNum;

    setResultado({
      area: areaNum,
      modalidade: dados.nome,
      maoObra: {
        pedreiro: { horas: pedreiroHoras, valor: pedreiroValor, descricao: comp.pedreiro.descricao },
        servente: { horas: serventeHoras, valor: serventeValor, descricao: comp.servente.descricao },
        total: totalMaoObra
      },
      materiais: {
        componentes,
        total: totalMateriais
      },
      total: totalGeral,
      valorPorM2
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
      <CalculadoraHeader title="Calculadora - Contra-Piso" bgColor="bg-green-600/90" />
      
      {/* Espaço para header fixo */}
      <div className="h-20" />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Formulário */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
            ⬜ Calculadora de Contra-Piso
          </h2>

          {/* Seleção de Modalidade */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Escolha a modalidade de orçamento:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div
                onClick={() => setModalidade('sinapi')}
                className={`p-4 border-2 rounded-xl transition-all cursor-pointer ${
                  modalidade === 'sinapi' 
                    ? 'border-green-500 bg-green-50 shadow-lg' 
                    : 'border-gray-200 hover:shadow-lg'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🏛️</div>
                  <div className="font-bold text-red-600">SINAPI Oficial</div>
                  <div className="text-sm text-gray-600">Caixa Econômica Federal</div>
                </div>
              </div>

              <div
                onClick={() => setModalidade('mercado')}
                className={`p-4 border-2 rounded-xl transition-all cursor-pointer ${
                  modalidade === 'mercado' 
                    ? 'border-green-500 bg-green-50 shadow-lg' 
                    : 'border-gray-200 hover:shadow-lg'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🏪</div>
                  <div className="font-bold text-green-600">Mercado Local</div>
                  <div className="text-sm text-gray-600">Profissionais Autônomos</div>
                </div>
              </div>
            </div>
          </div>

          {/* Input da Área */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Área do Contra-Piso (m²):
            </label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Ex: 25.5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && calcular()}
            />
          </div>

          <div className="text-center">
            <button
              onClick={calcular}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              🧮 Calcular Orçamento
            </button>
          </div>
        </div>

        {/* Resultados */}
        {resultado && (
          <div className="space-y-8">
            {/* Resultado Principal */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                📊 Resultado do Orçamento
              </h3>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {formatarMoeda(resultado.valorPorM2)}/m²
                </div>
                <div className="text-gray-600">
                  Área: {resultado.area} m² • {resultado.modalidade}
                </div>
                <div className="text-2xl font-bold text-gray-800 mt-2">
                  Total: {formatarMoeda(resultado.total)}
                </div>
              </div>
            </div>

            {/* Composição Detalhada */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                🔍 Composição Detalhada
              </h3>

              {/* Mão de Obra */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-red-600 mb-4 flex items-center">
                  <span className="mr-2">👷</span> Mão de Obra
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold">Pedreiro</div>
                      <div className="text-sm text-gray-600">{resultado.maoObra.pedreiro.descricao}</div>
                      <div className="text-sm text-gray-500">{resultado.maoObra.pedreiro.horas.toFixed(2)} horas</div>
                    </div>
                    <div className="font-bold text-red-600">
                      {formatarMoeda(resultado.maoObra.pedreiro.valor)}
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold">Servente</div>
                      <div className="text-sm text-gray-600">{resultado.maoObra.servente.descricao}</div>
                      <div className="text-sm text-gray-500">{resultado.maoObra.servente.horas.toFixed(2)} horas</div>
                    </div>
                    <div className="font-bold text-red-600">
                      {formatarMoeda(resultado.maoObra.servente.valor)}
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-500">
                      <div>
                        <div className="font-bold text-blue-800">TOTAL MÃO DE OBRA</div>
                        <div className="text-sm text-blue-600">
                          {formatarMoeda(resultado.maoObra.total / resultado.area)}/m²
                        </div>
                      </div>
                      <div className="font-bold text-blue-600 text-xl">
                        {formatarMoeda(resultado.maoObra.total)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Materiais */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-red-600 mb-4 flex items-center">
                  <span className="mr-2">🧱</span> Materiais
                </h4>
                <div className="space-y-3">
                  {resultado.materiais.componentes.map((comp, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-semibold">{comp.nome}</div>
                        <div className="text-sm text-gray-500">
                          {comp.qtd.toFixed(2)} {comp.unidade}
                        </div>
                      </div>
                      <div className="font-bold text-red-600">
                        {formatarMoeda(comp.valor)}
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-500">
                      <div>
                        <div className="font-bold text-green-800">TOTAL MATERIAIS</div>
                        <div className="text-sm text-green-600">
                          {formatarMoeda(resultado.materiais.total / resultado.area)}/m²
                        </div>
                      </div>
                      <div className="font-bold text-green-600 text-xl">
                        {formatarMoeda(resultado.materiais.total)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Geral */}
              <div className="border-t-2 border-red-200 pt-4">
                <div className="flex justify-between items-center p-4 bg-red-100 rounded-lg border border-red-500">
                  <div>
                    <div className="font-bold text-lg">TOTAL GERAL</div>
                    <div className="text-sm text-red-600">
                      {formatarMoeda(resultado.valorPorM2)}/m²
                    </div>
                  </div>
                  <div className="font-bold text-red-600 text-2xl">
                    {formatarMoeda(resultado.total)}
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