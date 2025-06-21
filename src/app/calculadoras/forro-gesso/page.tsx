"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaCalculator, FaArrowLeft, FaInfoCircle, FaDownload, FaTools, FaCog, FaChartBar } from "react-icons/fa";
import CalculadoraHeader from "../../components/CalculadoraHeader";

export default function ForroGessoPage() {
  const [area, setArea] = useState<string>("");
  const [tipoForro, setTipoForro] = useState<string>("liso");
  const [alturaMedia, setAlturaMedia] = useState<string>("2.8");
  const [complexidade, setComplexidade] = useState<string>("baixa");
  const [incluirEstrutura, setIncluirEstrutura] = useState<boolean>(true);
  const [resultado, setResultado] = useState<{
    area: number;
    tipo: string;
    altura: number;
    fator: number;
    sinapi: {
      maoDeObra: number;
      materiais: number;
      equipamentos: number;
      total: number;
      detalhamento: any[];
    };
    mercado: {
      maoDeObra: number;
      materiais: number;
      total: number;
      detalhamento: any[];
    };
    estimativas: {
      tempoExecucao: number;
      profissionaisNecessarios: number;
      produtividade: number;
    };
  } | null>(null);

  // Dados técnicos baseados em SINAPI e mercado local
  const dados = {
    sinapi: {
      maoDeObra: [
        { item: "Gesseiro", codigo: "88316", unidade: "H", coeficiente: 0.85, preco: 32.45, descricao: "Profissional especializado em gesso" },
        { item: "Servente de obras", codigo: "88309", unidade: "H", coeficiente: 0.42, preco: 26.18, descricao: "Auxiliar de gesseiro" }
      ],
      materiais: [
        { item: "Gesso em pó para revestimento, 20kg", codigo: "34567", unidade: "SC", coeficiente: 1.15, preco: 19.50, descricao: "Gesso comum para forro" },
        { item: "Arame galvanizado BWG 16", codigo: "01245", unidade: "KG", coeficiente: 0.08, preco: 14.20, descricao: "Para estrutura e fixação" },
        { item: "Prego de aço polido 18x27", codigo: "01678", unidade: "KG", coeficiente: 0.03, preco: 9.80, descricao: "Fixação da estrutura" },
        { item: "Sarrafo de madeira 2,5x5cm", codigo: "05432", unidade: "M", coeficiente: 3.2, preco: 4.50, descricao: "Estrutura de madeira" }
      ],
      equipamentos: [
        { item: "Andaime metálico", codigo: "10234", unidade: "M²/DIA", coeficiente: 1.0, preco: 2.80, descricao: "Locação de andaime" }
      ]
    },
    mercado: {
      maoDeObra: {
        gesseiro: { min: 25, max: 40, media: 32.50 },
        servente: { min: 18, max: 28, media: 23.00 }
      },
      materiais: [
        { item: "Gesso em pó 20kg", quantidade: 1.15, preco: 18.00, unidade: "saco", descricao: "Consumo por m²" },
        { item: "Arame galvanizado", quantidade: 0.08, preco: 13.50, unidade: "kg", descricao: "Para estrutura" },
        { item: "Sarrafo de madeira", quantidade: 3.2, preco: 4.20, unidade: "metro", descricao: "Estrutura de apoio" },
        { item: "Prego/parafuso", quantidade: 0.03, preco: 9.50, unidade: "kg", descricao: "Fixação geral" }
      ]
    }
  };

  // Fatores de complexidade
  const fatores = {
    tipo: {
      liso: { fator: 1.0, descricao: "Forro plano sem detalhes" },
      decorativo: { fator: 1.35, descricao: "Com molduras e detalhes" },
      sanca: { fator: 1.65, descricao: "Com sanca aberta ou fechada" },
      rebaixado: { fator: 1.25, descricao: "Forro rebaixado em níveis" }
    },
    complexidade: {
      baixa: { fator: 1.0, descricao: "Ambiente regular, sem obstáculos" },
      media: { fator: 1.15, descricao: "Com algumas interferências" },
      alta: { fator: 1.35, descricao: "Muitos recortes e detalhes" }
    },
    altura: {
      baixa: { limite: 2.5, fator: 1.0 },
      media: { limite: 3.5, fator: 1.1 },
      alta: { limite: 999, fator: 1.25 }
    }
  };

  const calcular = () => {
    const areaNum = parseFloat(area);
    const alturaNum = parseFloat(alturaMedia);

    if (!areaNum || areaNum <= 0) {
      alert("Por favor, insira uma área válida maior que zero!");
      return;
    }

    if (!alturaNum || alturaNum <= 0) {
      alert("Por favor, insira uma altura válida!");
      return;
    }

    // Calcular fatores
    const fatorTipo = fatores.tipo[tipoForro as keyof typeof fatores.tipo].fator;
    const fatorComplexidade = fatores.complexidade[complexidade as keyof typeof fatores.complexidade].fator;
    
    let fatorAltura = 1.0;
    if (alturaNum <= 2.5) fatorAltura = 1.0;
    else if (alturaNum <= 3.5) fatorAltura = 1.1;
    else fatorAltura = 1.25;

    const fatorTotal = fatorTipo * fatorComplexidade * fatorAltura;

    // Cálculo SINAPI
    const maoObraSinapi = dados.sinapi.maoDeObra.reduce((total, item) => {
      return total + (item.coeficiente * item.preco * areaNum * fatorTotal);
    }, 0);

    const materiaisSinapi = dados.sinapi.materiais.reduce((total, item) => {
      return total + (item.coeficiente * item.preco * areaNum * fatorTotal);
    }, 0);

    const equipamentosSinapi = incluirEstrutura ? dados.sinapi.equipamentos.reduce((total, item) => {
      return total + (item.coeficiente * item.preco * areaNum);
    }, 0) : 0;

    const totalSinapi = maoObraSinapi + materiaisSinapi + equipamentosSinapi;

    // Detalhamento SINAPI
    const detalhamentoSinapi = [
      ...dados.sinapi.maoDeObra.map(item => ({
        ...item,
        quantidade: (item.coeficiente * areaNum * fatorTotal).toFixed(2),
        valor: (item.coeficiente * item.preco * areaNum * fatorTotal)
      })),
      ...dados.sinapi.materiais.map(item => ({
        ...item,
        quantidade: (item.coeficiente * areaNum * fatorTotal).toFixed(2),
        valor: (item.coeficiente * item.preco * areaNum * fatorTotal)
      })),
      ...(incluirEstrutura ? dados.sinapi.equipamentos.map(item => ({
        ...item,
        quantidade: (item.coeficiente * areaNum).toFixed(2),
        valor: (item.coeficiente * item.preco * areaNum)
      })) : [])
    ];

    // Cálculo Mercado
    const maoObraMercado = (
      (dados.mercado.maoDeObra.gesseiro.media * 0.85 * areaNum * fatorTotal) +
      (dados.mercado.maoDeObra.servente.media * 0.42 * areaNum * fatorTotal)
    );

    const materiaisMercado = dados.mercado.materiais.reduce((total, item) => {
      return total + (item.quantidade * item.preco * areaNum * fatorTotal);
    }, 0);

    const totalMercado = maoObraMercado + materiaisMercado;

    // Detalhamento Mercado
    const detalhamentoMercado = [
      {
        item: "Gesseiro profissional",
        quantidade: (0.85 * areaNum * fatorTotal).toFixed(2),
        unidade: "H",
        preco: dados.mercado.maoDeObra.gesseiro.media,
        valor: dados.mercado.maoDeObra.gesseiro.media * 0.85 * areaNum * fatorTotal,
        descricao: "Mão de obra especializada"
      },
      {
        item: "Servente/Auxiliar",
        quantidade: (0.42 * areaNum * fatorTotal).toFixed(2),
        unidade: "H",
        preco: dados.mercado.maoDeObra.servente.media,
        valor: dados.mercado.maoDeObra.servente.media * 0.42 * areaNum * fatorTotal,
        descricao: "Auxiliar de gesseiro"
      },
      ...dados.mercado.materiais.map(item => ({
        ...item,
        quantidade: (item.quantidade * areaNum * fatorTotal).toFixed(2),
        valor: (item.quantidade * item.preco * areaNum * fatorTotal)
      }))
    ];

    // Estimativas de execução
    const produtividade = 12 / fatorTotal; // m²/dia por profissional
    const tempoExecucao = Math.ceil(areaNum / produtividade);
    const profissionaisNecessarios = areaNum > 30 ? 2 : 1;

    setResultado({
      area: areaNum,
      tipo: tipoForro,
      altura: alturaNum,
      fator: fatorTotal,
      sinapi: {
        maoDeObra: maoObraSinapi,
        materiais: materiaisSinapi,
        equipamentos: equipamentosSinapi,
        total: totalSinapi,
        detalhamento: detalhamentoSinapi
      },
      mercado: {
        maoDeObra: maoObraMercado,
        materiais: materiaisMercado,
        total: totalMercado,
        detalhamento: detalhamentoMercado
      },
      estimativas: {
        tempoExecucao,
        profissionaisNecessarios,
        produtividade
      }
    });
  };

  const limpar = () => {
    setArea("");
    setTipoForro("liso");
    setAlturaMedia("2.8");
    setComplexidade("baixa");
    setIncluirEstrutura(true);
    setResultado(null);
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <CalculadoraHeader title="Calculadora de Forro de Gesso" bgColor="bg-purple-600/90" />
      
      <div className="max-w-6xl mx-auto px-4 py-8 pt-24">
        {/* Navegação */}
        <div className="mb-6">
          <Link 
            href="/calculadoras" 
            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
          >
            <FaArrowLeft className="mr-2" />
            Voltar às Calculadoras
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 p-3 rounded-full">
                <FaCalculator className="text-purple-600 text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Dados do Projeto</h2>
                <p className="text-gray-600 text-sm">Configure os parâmetros do forro</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Área (m²)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: 25.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Altura média (m)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="2.0"
                    max="6.0"
                    value={alturaMedia}
                    onChange={(e) => setAlturaMedia(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: 2.8"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Forro
                </label>
                <select
                  value={tipoForro}
                  onChange={(e) => setTipoForro(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="liso">Liso - Fator 1.0</option>
                  <option value="decorativo">Decorativo - Fator 1.35</option>
                  <option value="sanca">Com Sanca - Fator 1.65</option>
                  <option value="rebaixado">Rebaixado - Fator 1.25</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complexidade da Obra
                </label>
                <select
                  value={complexidade}
                  onChange={(e) => setComplexidade(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="baixa">Baixa - Ambiente regular</option>
                  <option value="media">Média - Algumas interferências</option>
                  <option value="alta">Alta - Muitos recortes</option>
                </select>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={incluirEstrutura}
                    onChange={(e) => setIncluirEstrutura(e.target.checked)}
                    className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    Incluir estrutura e andaime
                  </span>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={calcular}
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Calcular Orçamento
                </button>
                <button
                  onClick={limpar}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Limpar
                </button>
              </div>
            </div>
          </div>

          {/* Informações Técnicas */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaInfoCircle className="text-purple-600" />
                Informações Técnicas
              </h3>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <strong className="text-purple-600">Consumo médio:</strong> 1,15 sacos de gesso por m²
                </div>
                <div>
                  <strong className="text-purple-600">Produtividade:</strong> 10-15 m²/dia por profissional
                </div>
                <div>
                  <strong className="text-purple-600">Espessura:</strong> 1,5 a 2,0 cm de gesso
                </div>
                <div>
                  <strong className="text-purple-600">Cura:</strong> 24-48 horas para pintura
                </div>
              </div>

              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <div className="text-xs text-purple-700">
                  <strong>Dica:</strong> Forros com sanca e detalhes decorativos podem aumentar 
                  significativamente o tempo e custo de execução.
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaTools className="text-purple-600" />
                Materiais Necessários
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Gesso em pó (20kg)</span>
                  <span className="font-medium">1,15 sacos/m²</span>
                </div>
                <div className="flex justify-between">
                  <span>Arame galvanizado</span>
                  <span className="font-medium">80g/m²</span>
                </div>
                <div className="flex justify-between">
                  <span>Sarrafo de madeira</span>
                  <span className="font-medium">3,2m/m²</span>
                </div>
                <div className="flex justify-between">
                  <span>Pregos/parafusos</span>
                  <span className="font-medium">30g/m²</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resultados */}
        {resultado && (
          <div className="mt-8 space-y-6">
            {/* Resumo Executivo */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
                <FaChartBar className="text-purple-600" />
                Orçamento Detalhado
              </h3>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-purple-600 font-medium">Área Total</div>
                  <div className="text-2xl font-bold text-purple-800">{resultado.area} m²</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-blue-600 font-medium">Fator Total</div>
                  <div className="text-2xl font-bold text-blue-800">{resultado.fator.toFixed(2)}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-green-600 font-medium">Tempo Estimado</div>
                  <div className="text-2xl font-bold text-green-800">{resultado.estimativas.tempoExecucao} dias</div>
                </div>
              </div>

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
                    {resultado.sinapi.equipamentos > 0 && (
                      <div className="flex justify-between">
                        <span>Equipamentos:</span>
                        <span className="font-semibold">{formatarMoeda(resultado.sinapi.equipamentos)}</span>
                      </div>
                    )}
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

              {/* Análise Comparativa */}
              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-800 mb-4 text-center">📊 Análise Comparativa</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <span className="text-gray-600 block">Diferença de Preço</span>
                    <div className="font-bold text-lg">
                      {formatarMoeda(Math.abs(resultado.sinapi.total - resultado.mercado.total))}
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-600 block">Profissionais</span>
                    <div className="font-bold text-lg">{resultado.estimativas.profissionaisNecessarios}</div>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-600 block">Produtividade</span>
                    <div className="font-bold text-lg">{resultado.estimativas.produtividade.toFixed(1)} m²/dia</div>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-600 block">Tipo/Altura</span>
                    <div className="font-bold text-lg capitalize">{resultado.tipo}/{resultado.altura}m</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detalhamento de Custos */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Detalhamento SINAPI */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h4 className="text-lg font-bold text-red-600 mb-4">🏛️ Composição SINAPI Detalhada</h4>
                <div className="space-y-2 text-sm">
                  {resultado.sinapi.detalhamento.map((item, index) => (
                    <div key={index} className="border-b pb-2">
                      <div className="flex justify-between font-medium">
                        <span>{item.item}</span>
                        <span>{formatarMoeda(item.valor)}</span>
                      </div>
                      <div className="text-xs text-gray-500 flex justify-between">
                        <span>{item.descricao}</span>
                        <span>{item.quantidade} {item.unidade}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detalhamento Mercado */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h4 className="text-lg font-bold text-green-600 mb-4">🏪 Composição Mercado Local</h4>
                <div className="space-y-2 text-sm">
                  {resultado.mercado.detalhamento.map((item, index) => (
                    <div key={index} className="border-b pb-2">
                      <div className="flex justify-between font-medium">
                        <span>{item.item}</span>
                        <span>{formatarMoeda(item.valor)}</span>
                      </div>
                      <div className="text-xs text-gray-500 flex justify-between">
                        <span>{item.descricao}</span>
                        <span>{item.quantidade} {item.unidade}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dicas e Orientações */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl p-6">
              <h3 className="font-bold mb-4 text-center">💡 Dicas Importantes para Forro de Gesso</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">✅ Antes da Execução:</h4>
                  <ul className="space-y-1 list-disc list-inside opacity-90">
                    <li>Verificar estrutura do teto</li>
                    <li>Conferir instalações elétricas</li>
                    <li>Definir pontos de iluminação</li>
                    <li>Escolher gesso de qualidade</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">⚠️ Cuidados Especiais:</h4>
                  <ul className="space-y-1 list-disc list-inside opacity-90">
                    <li>Evitar ambientes muito úmidos</li>
                    <li>Aguardar cura completa</li>
                    <li>Usar primer antes da pintura</li>
                    <li>Manutenção preventiva anual</li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <Link 
                  href="/buscar-profissional"
                  className="inline-flex items-center bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors font-medium"
                >
                  Encontrar Gesseiro Profissional
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 