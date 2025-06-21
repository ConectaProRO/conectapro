"use client";
import React, { useState } from "react";
import { FaDownload, FaFileContract, FaUser, FaBuilding, FaCalendar, FaDollarSign, FaClipboardList } from "react-icons/fa";

interface ContratoData {
  // Dados do Contratante (Cliente)
  contratanteNome: string;
  contratanteCpf: string;
  contratanteRg: string;
  contratanteEndereco: string;
  contratanteTelefone: string;
  contratanteEmail: string;
  
  // Dados do Contratado (Profissional)
  contratadoNome: string;
  contratadoCpfCnpj: string;
  contratadoRg: string;
  contratadoEndereco: string;
  contratadoTelefone: string;
  contratadoEmail: string;
  
  // Dados do Serviço
  tipoServico: string;
  descricaoDetalhada: string;
  localExecucao: string;
  prazoExecucao: string;
  dataInicio: string;
  valorTotal: string;
  formaPagamento: string;
  
  // Observações
  observacoes: string;
}

export default function GeradorContratoPage() {
  const [contratoData, setContratoData] = useState<ContratoData>({
    contratanteNome: "",
    contratanteCpf: "",
    contratanteRg: "",
    contratanteEndereco: "",
    contratanteTelefone: "",
    contratanteEmail: "",
    contratadoNome: "",
    contratadoCpfCnpj: "",
    contratadoRg: "",
    contratadoEndereco: "",
    contratadoTelefone: "",
    contratadoEmail: "",
    tipoServico: "",
    descricaoDetalhada: "",
    localExecucao: "",
    prazoExecucao: "",
    dataInicio: "",
    valorTotal: "",
    formaPagamento: "",
    observacoes: ""
  });

  const [step, setStep] = useState(1);

  const handleInputChange = (field: keyof ContratoData, value: string) => {
    setContratoData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const gerarContratoPDF = () => {
    // Criar conteúdo HTML do contrato
    const contratoHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Contrato de Prestação de Serviços</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
          .header { text-align: center; margin-bottom: 30px; }
          .section { margin-bottom: 20px; }
          .title { font-weight: bold; text-decoration: underline; margin-bottom: 10px; }
          .clause { margin-bottom: 15px; text-align: justify; }
          .signature { margin-top: 50px; display: flex; justify-content: space-between; }
          .signature-box { text-align: center; width: 45%; }
          .line { border-bottom: 1px solid #000; margin-bottom: 5px; height: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>CONTRATO DE PRESTAÇÃO DE SERVIÇOS</h1>
          <p><strong>Gerado via ConectaPro - conectapro.app</strong></p>
        </div>

        <div class="section">
          <div class="title">CONTRATANTE:</div>
          <p><strong>Nome:</strong> ${contratoData.contratanteNome}</p>
          <p><strong>CPF:</strong> ${contratoData.contratanteCpf}</p>
          <p><strong>RG:</strong> ${contratoData.contratanteRg}</p>
          <p><strong>Endereço:</strong> ${contratoData.contratanteEndereco}</p>
          <p><strong>Telefone:</strong> ${contratoData.contratanteTelefone}</p>
          <p><strong>E-mail:</strong> ${contratoData.contratanteEmail}</p>
        </div>

        <div class="section">
          <div class="title">CONTRATADO:</div>
          <p><strong>Nome:</strong> ${contratoData.contratadoNome}</p>
          <p><strong>CPF/CNPJ:</strong> ${contratoData.contratadoCpfCnpj}</p>
          <p><strong>RG:</strong> ${contratoData.contratadoRg}</p>
          <p><strong>Endereço:</strong> ${contratoData.contratadoEndereco}</p>
          <p><strong>Telefone:</strong> ${contratoData.contratadoTelefone}</p>
          <p><strong>E-mail:</strong> ${contratoData.contratadoEmail}</p>
        </div>

        <div class="section">
          <div class="title">OBJETO DO CONTRATO:</div>
          <div class="clause">
            <strong>1. SERVIÇO:</strong> ${contratoData.tipoServico}
          </div>
          <div class="clause">
            <strong>2. DESCRIÇÃO DETALHADA:</strong> ${contratoData.descricaoDetalhada}
          </div>
          <div class="clause">
            <strong>3. LOCAL DE EXECUÇÃO:</strong> ${contratoData.localExecucao}
          </div>
        </div>

        <div class="section">
          <div class="title">CONDIÇÕES:</div>
          <div class="clause">
            <strong>4. PRAZO:</strong> O serviço deverá ser executado no prazo de ${contratoData.prazoExecucao}, com início em ${contratoData.dataInicio}.
          </div>
          <div class="clause">
            <strong>5. VALOR:</strong> O valor total dos serviços é de R$ ${contratoData.valorTotal}.
          </div>
          <div class="clause">
            <strong>6. FORMA DE PAGAMENTO:</strong> ${contratoData.formaPagamento}.
          </div>
          <div class="clause">
            <strong>7. RESPONSABILIDADES:</strong> O CONTRATADO se compromete a executar os serviços com qualidade e dentro do prazo estabelecido, fornecendo materiais de primeira qualidade quando especificado.
          </div>
          <div class="clause">
            <strong>8. GARANTIA:</strong> Os serviços possuem garantia de 90 (noventa) dias contra defeitos de execução.
          </div>
          ${contratoData.observacoes ? `
          <div class="clause">
            <strong>9. OBSERVAÇÕES:</strong> ${contratoData.observacoes}
          </div>
          ` : ''}
        </div>

        <div class="clause">
          E por estarem assim justos e contratados, assinam o presente instrumento em duas vias de igual teor.
        </div>

        <p style="text-align: center; margin-top: 30px;">
          <strong>Porto Velho - RO, ${new Date().toLocaleDateString('pt-BR')}</strong>
        </p>

        <div class="signature">
          <div class="signature-box">
            <div class="line"></div>
            <p><strong>CONTRATANTE</strong><br>${contratoData.contratanteNome}</p>
          </div>
          <div class="signature-box">
            <div class="line"></div>
            <p><strong>CONTRATADO</strong><br>${contratoData.contratadoNome}</p>
          </div>
        </div>

        <div style="text-align: center; margin-top: 50px; font-size: 12px; color: #666;">
          <p>Contrato gerado através da plataforma ConectaPro</p>
          <p>www.conectapro.app - Conectando profissionais em Porto Velho</p>
        </div>
      </body>
      </html>
    `;

    // Criar e baixar o arquivo
    const blob = new Blob([contratoHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contrato-${contratoData.contratanteNome.replace(/\s+/g, '-')}-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Contrato gerado com sucesso! Você pode abrir o arquivo HTML e imprimir como PDF.');
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return contratoData.contratanteNome && contratoData.contratanteCpf && contratoData.contratanteEndereco;
      case 2:
        return contratoData.contratadoNome && contratoData.contratadoCpfCnpj && contratoData.contratadoEndereco;
      case 3:
        return contratoData.tipoServico && contratoData.descricaoDetalhada && contratoData.localExecucao;
      case 4:
        return contratoData.valorTotal && contratoData.formaPagamento && contratoData.prazoExecucao;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <FaFileContract className="text-4xl text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Gerador de Contrato</h1>
          </div>
          <p className="text-gray-600">
            Crie contratos profissionais de prestação de serviços de forma rápida e segura
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progresso</span>
            <span className="text-sm text-gray-600">{step}/4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Dados do Contratante */}
          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FaUser className="text-2xl text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Dados do Contratante (Cliente)</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nome Completo *</label>
                  <input
                    type="text"
                    value={contratoData.contratanteNome}
                    onChange={(e) => handleInputChange('contratanteNome', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: João Silva Santos"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">CPF *</label>
                  <input
                    type="text"
                    value={contratoData.contratanteCpf}
                    onChange={(e) => handleInputChange('contratanteCpf', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="000.000.000-00"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">RG</label>
                  <input
                    type="text"
                    value={contratoData.contratanteRg}
                    onChange={(e) => handleInputChange('contratanteRg', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0000000 SSP/RO"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Telefone</label>
                  <input
                    type="text"
                    value={contratoData.contratanteTelefone}
                    onChange={(e) => handleInputChange('contratanteTelefone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(69) 99999-9999"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Endereço Completo *</label>
                  <input
                    type="text"
                    value={contratoData.contratanteEndereco}
                    onChange={(e) => handleInputChange('contratanteEndereco', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Rua, número, bairro, cidade - RO, CEP"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">E-mail</label>
                  <input
                    type="email"
                    value={contratoData.contratanteEmail}
                    onChange={(e) => handleInputChange('contratanteEmail', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="cliente@email.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Dados do Contratado */}
          {step === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FaBuilding className="text-2xl text-green-600" />
                <h2 className="text-2xl font-bold text-gray-800">Dados do Contratado (Profissional)</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nome Completo/Razão Social *</label>
                  <input
                    type="text"
                    value={contratoData.contratadoNome}
                    onChange={(e) => handleInputChange('contratadoNome', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ex: Maria Construções Ltda"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">CPF/CNPJ *</label>
                  <input
                    type="text"
                    value={contratoData.contratadoCpfCnpj}
                    onChange={(e) => handleInputChange('contratadoCpfCnpj', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="000.000.000-00 ou 00.000.000/0001-00"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">RG/Inscrição Estadual</label>
                  <input
                    type="text"
                    value={contratoData.contratadoRg}
                    onChange={(e) => handleInputChange('contratadoRg', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="0000000 SSP/RO"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Telefone</label>
                  <input
                    type="text"
                    value={contratoData.contratadoTelefone}
                    onChange={(e) => handleInputChange('contratadoTelefone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="(69) 99999-9999"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Endereço Completo *</label>
                  <input
                    type="text"
                    value={contratoData.contratadoEndereco}
                    onChange={(e) => handleInputChange('contratadoEndereco', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Rua, número, bairro, cidade - RO, CEP"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">E-mail</label>
                  <input
                    type="email"
                    value={contratoData.contratadoEmail}
                    onChange={(e) => handleInputChange('contratadoEmail', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="profissional@email.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Dados do Serviço */}
          {step === 3 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FaClipboardList className="text-2xl text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-800">Dados do Serviço</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Tipo de Serviço *</label>
                  <select
                    value={contratoData.tipoServico}
                    onChange={(e) => handleInputChange('tipoServico', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Selecione o tipo de serviço</option>
                    <option value="Alvenaria">Alvenaria</option>
                    <option value="Contra-Piso">Contra-Piso</option>
                    <option value="Forro de Gesso">Forro de Gesso</option>
                    <option value="Instalações Elétricas">Instalações Elétricas</option>
                    <option value="Instalações Hidráulicas">Instalações Hidráulicas</option>
                    <option value="Pintura">Pintura</option>
                    <option value="Revestimento Cerâmico">Revestimento Cerâmico</option>
                    <option value="Reforma Geral">Reforma Geral</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Descrição Detalhada do Serviço *</label>
                  <textarea
                    value={contratoData.descricaoDetalhada}
                    onChange={(e) => handleInputChange('descricaoDetalhada', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Descreva detalhadamente o serviço a ser executado, incluindo materiais, especificações técnicas, etc."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Local de Execução *</label>
                  <input
                    type="text"
                    value={contratoData.localExecucao}
                    onChange={(e) => handleInputChange('localExecucao', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Endereço onde o serviço será executado"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Data de Início</label>
                  <input
                    type="date"
                    value={contratoData.dataInicio}
                    onChange={(e) => handleInputChange('dataInicio', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Condições Financeiras */}
          {step === 4 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FaDollarSign className="text-2xl text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-800">Condições Financeiras e Prazo</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Valor Total *</label>
                    <input
                      type="text"
                      value={contratoData.valorTotal}
                      onChange={(e) => handleInputChange('valorTotal', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="5.000,00"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Prazo de Execução *</label>
                    <input
                      type="text"
                      value={contratoData.prazoExecucao}
                      onChange={(e) => handleInputChange('prazoExecucao', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Ex: 15 dias úteis"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Forma de Pagamento *</label>
                  <textarea
                    value={contratoData.formaPagamento}
                    onChange={(e) => handleInputChange('formaPagamento', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ex: 50% na assinatura do contrato e 50% na conclusão dos serviços"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Observações Adicionais</label>
                  <textarea
                    value={contratoData.observacoes}
                    onChange={(e) => handleInputChange('observacoes', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Observações especiais, cláusulas adicionais, etc."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                step === 1 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              ← Anterior
            </button>

            {step < 4 ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  canProceed() 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Próximo →
              </button>
            ) : (
              <button
                onClick={gerarContratoPDF}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  canProceed() 
                    ? 'bg-green-600 text-white hover:bg-green-700 hover:scale-105' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <FaDownload />
                Gerar Contrato
              </button>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-3">💡 Sobre o Gerador de Contratos</h3>
          <ul className="text-blue-700 space-y-2 text-sm">
            <li>• <strong>Gratuito:</strong> Ferramenta 100% gratuita para profissionais e clientes</li>
            <li>• <strong>Personalizado:</strong> Contrato adaptado às suas necessidades específicas</li>
            <li>• <strong>Profissional:</strong> Modelo baseado em boas práticas jurídicas</li>
            <li>• <strong>Seguro:</strong> Seus dados não são armazenados em nossos servidores</li>
            <li>• <strong>Prático:</strong> Gera arquivo HTML que pode ser convertido em PDF</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 