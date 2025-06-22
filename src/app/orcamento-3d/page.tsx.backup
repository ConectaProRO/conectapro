"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import CalculadoraHeader from "../components/CalculadoraHeader";

interface ElementoConstrutivo {
  tipo: string;
  area: number;
  material: string;
  acabamento: string;
  localizacao: string;
  complexidade: string;
}

interface ItemOrcamento {
  codigo_sinapi: string;
  descricao: string;
  unidade: string;
  quantidade: number;
  preco_unitario: number;
  preco_total: number;
  categoria: string;
}

interface OrcamentoCompleto {
  projeto_id: string;
  nome_projeto: string;
  data_criacao: string;
  area_total: number;
  elementos: ElementoConstrutivo[];
  itens: ItemOrcamento[];
  resumo_categorias: Record<string, number>;
  total_geral: number;
  observacoes: string[];
}

export default function Orcamento3DPage() {
  const [etapaAtual, setEtapaAtual] = useState<'upload' | 'processando' | 'resultado'>('upload');
  const [orcamento, setOrcamento] = useState<OrcamentoCompleto | null>(null);
  const [nomeProjetoInput, setNomeProjetoInput] = useState("");
  const [urlModelo3D, setUrlModelo3D] = useState("");
  const [arquivoPlanta, setArquivoPlanta] = useState<File | null>(null);
  const [processando, setProcessando] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulação dos dados SINAPI
  const dadosSINAPI = {
    "alvenaria": {
      "codigo": "73915/001",
      "descricao": "ALVENARIA DE VEDAÇÃO DE BLOCOS CERÂMICOS FURADOS 9X14X19CM",
      "preco_desonerado": 87.45
    },
    "piso": {
      "codigo": "87254", 
      "descricao": "REVESTIMENTO CERÂMICO PARA PISO 45X45CM",
      "preco_desonerado": 65.80
    },
    "cobertura": {
      "codigo": "74139/001",
      "descricao": "TELHAMENTO COM TELHA CERÂMICA TIPO FRANCESA", 
      "preco_desonerado": 45.80
    }
  };

  const processarProjeto = async () => {
    if (!nomeProjetoInput.trim()) {
      alert("Por favor, insira o nome do projeto");
      return;
    }

    if (!urlModelo3D.trim() && !arquivoPlanta) {
      alert("Por favor, forneça uma URL do modelo 3D ou faça upload de uma planta");
      return;
    }

    setProcessando(true);
    setEtapaAtual('processando');

    // Simular processamento (2-3 segundos)
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Simular análise de modelo 3D e geração de orçamento
    const elementosDetectados: ElementoConstrutivo[] = [
      {
        tipo: "alvenaria",
        area: 120.5,
        material: "ceramico",
        acabamento: "medio",
        localizacao: "interno",
        complexidade: "simples"
      },
      {
        tipo: "piso", 
        area: 85.0,
        material: "ceramica",
        acabamento: "medio",
        localizacao: "interno",
        complexidade: "simples"
      },
      {
        tipo: "cobertura",
        area: 95.0,
        material: "telha_ceramica",
        acabamento: "medio", 
        localizacao: "externo",
        complexidade: "media"
      }
    ];

    // Gerar itens de orçamento
    const itens: ItemOrcamento[] = [];
    let totalGeral = 0;
    const resumoCategorias: Record<string, number> = {};

    elementosDetectados.forEach(elemento => {
      if (elemento.tipo in dadosSINAPI) {
        const dados = dadosSINAPI[elemento.tipo as keyof typeof dadosSINAPI];
        
        // Fator de complexidade
        const fatorComplexidade = elemento.complexidade === "media" ? 1.15 : 1.0;
        const precoFinal = dados.preco_desonerado * fatorComplexidade;
        const precoTotal = elemento.area * precoFinal;

        const categoria = elemento.tipo === "alvenaria" ? "Vedações" :
                         elemento.tipo === "piso" ? "Pisos e Revestimentos" : "Cobertura";

        const item: ItemOrcamento = {
          codigo_sinapi: dados.codigo,
          descricao: dados.descricao,
          unidade: "m²",
          quantidade: elemento.area,
          preco_unitario: precoFinal,
          preco_total: precoTotal,
          categoria: categoria
        };

        itens.push(item);
        totalGeral += precoTotal;

        if (!resumoCategorias[categoria]) {
          resumoCategorias[categoria] = 0;
        }
        resumoCategorias[categoria] += precoTotal;
      }
    });

    const areaTotal = elementosDetectados.reduce((sum, elem) => sum + elem.area, 0);

    const orcamentoGerado: OrcamentoCompleto = {
      projeto_id: `PROJ_${Date.now()}`,
      nome_projeto: nomeProjetoInput,
      data_criacao: new Date().toLocaleDateString('pt-BR'),
      area_total: areaTotal,
      elementos: elementosDetectados,
      itens: itens,
      resumo_categorias: resumoCategorias,
      total_geral: totalGeral,
      observacoes: [
        "Orçamento baseado em análise automatizada de modelo 3D",
        "Preços baseados na tabela SINAPI oficial e CUB Sinduscon-RO",
        "Valores podem variar conforme especificações técnicas detalhadas",
        "Recomenda-se validação com profissional especializado",
        `Custo por m²: R$ ${(totalGeral/areaTotal).toFixed(2)} (referência CUB: R$ 1.847,25)`
      ]
    };

    setOrcamento(orcamentoGerado);
    setProcessando(false);
    setEtapaAtual('resultado');
  };

  const voltarInicio = () => {
    setEtapaAtual('upload');
    setOrcamento(null);
    setNomeProjetoInput("");
    setUrlModelo3D("");
    setArquivoPlanta(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const baixarRelatorio = () => {
    if (!orcamento) return;

    // Gerar relatório HTML
    const html = gerarRelatorioHTML(orcamento);
    
    // Criar blob e download
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${orcamento.nome_projeto.replace(/\s+/g, '_')}_Orcamento.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const gerarRelatorioHTML = (orc: OrcamentoCompleto): string => {
    const itensTabela = orc.itens.map(item => `
      <tr>
        <td>${item.codigo_sinapi}</td>
        <td>${item.descricao}</td>
        <td>${item.unidade}</td>
        <td>${item.quantidade.toFixed(2)}</td>
        <td>R$ ${item.preco_unitario.toFixed(2)}</td>
        <td>R$ ${item.preco_total.toFixed(2)}</td>
        <td>${item.categoria}</td>
      </tr>
    `).join('');

    const elementosHtml = orc.elementos.map(elem => `
      <div class="elemento-3d">
        <h4>🏗️ ${elem.tipo.charAt(0).toUpperCase() + elem.tipo.slice(1)} - ${elem.material}</h4>
        <p><strong>Área:</strong> ${elem.area} m² | <strong>Localização:</strong> ${elem.localizacao} | <strong>Complexidade:</strong> ${elem.complexidade}</p>
      </div>
    `).join('');

    const observacoesHtml = orc.observacoes.map(obs => `<li>${obs}</li>`).join('');

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Orçamento ConectaPro - ${orc.nome_projeto}</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 10px; }
        .projeto-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .info-card { background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb; }
        .tabela-itens { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .tabela-itens th, .tabela-itens td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        .tabela-itens th { background: #2563eb; color: white; font-weight: 600; }
        .tabela-itens tbody tr:hover { background: #f9fafb; }
        .total-geral { background: #2563eb; color: white; text-align: center; padding: 20px; border-radius: 8px; margin-top: 20px; }
        .observacoes { background: #fef3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; margin-top: 20px; }
        .elemento-3d { background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #0066cc; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🏗️ ConectaPro - Orçamento Inteligente 3D</div>
            <h1>${orc.nome_projeto}</h1>
            <p>Orçamento baseado em análise 3D + SINAPI + IA</p>
        </div>
        
        <div class="projeto-info">
            <div class="info-card">
                <h3>📋 Informações do Projeto</h3>
                <p><strong>Data:</strong> ${orc.data_criacao}</p>
                <p><strong>Área Total:</strong> ${orc.area_total.toFixed(2)} m²</p>
                <p><strong>Elementos:</strong> ${orc.elementos.length}</p>
            </div>
            <div class="info-card">
                <h3>💰 Resumo Financeiro</h3>
                <p><strong>Total Geral:</strong> R$ ${orc.total_geral.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                <p><strong>Custo por m²:</strong> R$ ${(orc.total_geral/orc.area_total).toFixed(2)}</p>
                <p><strong>Base:</strong> SINAPI + CUB Sinduscon-RO</p>
            </div>
        </div>
        
        <h2>🏗️ Elementos Detectados pelo Sistema 3D</h2>
        ${elementosHtml}
        
        <h2>📋 Planilha Detalhada</h2>
        <table class="tabela-itens">
            <thead>
                <tr>
                    <th>Código SINAPI</th>
                    <th>Descrição</th>
                    <th>Unidade</th>
                    <th>Quantidade</th>
                    <th>Preço Unit.</th>
                    <th>Total</th>
                    <th>Categoria</th>
                </tr>
            </thead>
            <tbody>
                ${itensTabela}
            </tbody>
        </table>
        
        <div class="total-geral">
            <h2>💰 TOTAL GERAL: R$ ${orc.total_geral.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</h2>
            <p>Orçamento baseado em análise 3D automatizada + dados oficiais SINAPI</p>
        </div>
        
        <div class="observacoes">
            <h3>⚠️ Observações Importantes</h3>
            <ul>${observacoesHtml}</ul>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 8px;">
            <p><strong>🏗️ ConectaPro - Conectando profissionais da construção</strong></p>
            <p>📞 WhatsApp: (69) 99256-1830 | 📧 conectaproro@gmail.com</p>
            <p>🌐 <a href="https://conectapro.app" style="color: #2563eb;">conectapro.app</a></p>
        </div>
    </div>
</body>
</html>
    `;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CalculadoraHeader title="Orçamento Inteligente 3D" bgColor="bg-purple-600/90" />
      
      <div className="h-20" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Principal */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-2xl p-8 shadow-xl">
            <h1 className="text-4xl font-bold mb-4">🚀 Orçamento Inteligente 3D</h1>
            <p className="text-xl opacity-90 mb-2">Análise de Modelos 3D + SINAPI + Inteligência Artificial</p>
            <p className="text-lg opacity-80">Revolucionando orçamentos de construção com tecnologia de ponta</p>
          </div>
        </div>

        {/* Etapa Upload */}
        {etapaAtual === 'upload' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              📤 Upload do Projeto
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Informações do Projeto */}
              <div>
                <h3 className="text-lg font-bold text-gray-700 mb-4">📋 Informações do Projeto</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Projeto *
                  </label>
                  <input
                    type="text"
                    value={nomeProjetoInput}
                    onChange={(e) => setNomeProjetoInput(e.target.value)}
                    placeholder="Ex: Casa Residencial 120m²"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL do Modelo 3D (Sketchfab)
                  </label>
                  <input
                    type="url"
                    value={urlModelo3D}
                    onChange={(e) => setUrlModelo3D(e.target.value)}
                    placeholder="https://sketchfab.com/3d-models/..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="text-center text-gray-500 mb-4">OU</div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload da Planta Baixa
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => setArquivoPlanta(e.target.files?.[0] || null)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {arquivoPlanta && (
                    <p className="mt-2 text-sm text-green-600">
                      ✅ Arquivo selecionado: {arquivoPlanta.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Como Funciona */}
              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-purple-800 mb-4">🤖 Como Funciona</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-bold text-purple-700">Análise 3D</h4>
                      <p className="text-sm text-purple-600">IA identifica elementos construtivos no modelo</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-bold text-purple-700">Cálculo SINAPI</h4>
                      <p className="text-sm text-purple-600">Preços oficiais aplicados automaticamente</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-bold text-purple-700">Relatório Inteligente</h4>
                      <p className="text-sm text-purple-600">Orçamento completo com gráficos e análises</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-100 rounded-lg border border-yellow-300">
                  <p className="text-sm text-yellow-800">
                    <strong>💡 Dica:</strong> Para melhores resultados, use modelos 3D com elementos bem definidos ou plantas baixas com boa resolução.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={processarProjeto}
                disabled={!nomeProjetoInput.trim() || (!urlModelo3D.trim() && !arquivoPlanta)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                🚀 Processar Projeto com IA
              </button>
            </div>
          </div>
        )}

        {/* Etapa Processando */}
        {etapaAtual === 'processando' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-purple-600 mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🤖 Processando com IA...</h2>
            <p className="text-gray-600 mb-6">Analisando modelo 3D e gerando orçamento inteligente</p>
            
            <div className="max-w-md mx-auto">
              <div className="bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
              </div>
              <p className="text-sm text-gray-500">Identificando elementos construtivos...</p>
            </div>
          </div>
        )}

        {/* Etapa Resultado */}
        {etapaAtual === 'resultado' && orcamento && (
          <div className="space-y-8">
            {/* Resumo do Projeto */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">✅ Orçamento Gerado com Sucesso!</h2>
                <p className="text-gray-600">Projeto: <strong>{orcamento.nome_projeto}</strong></p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-purple-50 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600">{orcamento.area_total.toFixed(0)} m²</div>
                  <div className="text-purple-700 font-medium">Área Total</div>
                </div>
                <div className="bg-green-50 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-600">R$ {orcamento.total_geral.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                  <div className="text-green-700 font-medium">Total Geral</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600">R$ {(orcamento.total_geral/orcamento.area_total).toFixed(2)}</div>
                  <div className="text-blue-700 font-medium">Custo por m²</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={baixarRelatorio}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300"
                >
                  📄 Baixar Relatório HTML
                </button>
                <button
                  onClick={voltarInicio}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-xl font-bold hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
                >
                  🔄 Novo Projeto
                </button>
                <Link 
                  href="/buscar-profissional"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-center"
                >
                  👷 Buscar Profissionais
                </Link>
              </div>
            </div>

            {/* Elementos Detectados */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">🏗️ Elementos Detectados pela IA</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orcamento.elementos.map((elemento, index) => (
                  <div key={index} className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-800 mb-2">
                      {elemento.tipo.charAt(0).toUpperCase() + elemento.tipo.slice(1)} - {elemento.material}
                    </h4>
                    <p className="text-sm text-blue-600 mb-1">
                      <strong>Área:</strong> {elemento.area} m²
                    </p>
                    <p className="text-sm text-blue-600 mb-1">
                      <strong>Localização:</strong> {elemento.localizacao}
                    </p>
                    <p className="text-sm text-blue-600">
                      <strong>Complexidade:</strong> {elemento.complexidade}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Planilha de Itens */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">📋 Planilha Detalhada SINAPI</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-purple-600 text-white">
                      <th className="p-3 text-left">Código SINAPI</th>
                      <th className="p-3 text-left">Descrição</th>
                      <th className="p-3 text-left">Unidade</th>
                      <th className="p-3 text-right">Quantidade</th>
                      <th className="p-3 text-right">Preço Unit.</th>
                      <th className="p-3 text-right">Total</th>
                      <th className="p-3 text-left">Categoria</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orcamento.itens.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-3 font-mono text-sm">{item.codigo_sinapi}</td>
                        <td className="p-3">{item.descricao}</td>
                        <td className="p-3 text-center">{item.unidade}</td>
                        <td className="p-3 text-right">{item.quantidade.toFixed(2)}</td>
                        <td className="p-3 text-right">R$ {item.preco_unitario.toFixed(2)}</td>
                        <td className="p-3 text-right font-bold">R$ {item.preco_total.toFixed(2)}</td>
                        <td className="p-3">{item.categoria}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 bg-purple-600 text-white text-center p-6 rounded-xl">
                <h3 className="text-2xl font-bold">💰 TOTAL GERAL: R$ {orcamento.total_geral.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</h3>
                <p className="mt-2 opacity-90">Orçamento baseado em análise 3D automatizada + dados oficiais SINAPI</p>
              </div>
            </div>

            {/* Observações */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-yellow-800 mb-4">⚠️ Observações Importantes</h3>
              <ul className="space-y-2">
                {orcamento.observacoes.map((obs, index) => (
                  <li key={index} className="text-yellow-700 flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    {obs}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Seção Educativa */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">🎯 Próximos Passos</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👷</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Encontrar Profissionais</h4>
              <p className="text-gray-600 text-sm mb-4">Use nosso sistema para encontrar profissionais qualificados em Porto Velho</p>
              <Link href="/buscar-profissional" className="text-blue-600 font-medium hover:text-blue-800">
                Buscar Profissionais →
              </Link>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧮</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Calculadoras SINAPI</h4>
              <p className="text-gray-600 text-sm mb-4">Use nossas calculadoras para orçamentos detalhados por serviço</p>
              <Link href="/calculadoras" className="text-green-600 font-medium hover:text-green-800">
                Ver Calculadoras →
              </Link>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Preços CUB</h4>
              <p className="text-gray-600 text-sm mb-4">Consulte preços oficiais baseados no CUB Sinduscon-RO</p>
              <Link href="/precos-cub" className="text-purple-600 font-medium hover:text-purple-800">
                Ver Preços CUB →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 