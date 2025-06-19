"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CadastroProfissional() {
  const [cadastroRealizado, setCadastroRealizado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Teste: Formulário enviado!');
    setCarregando(true);
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const dados = {
        nome: formData.get('nome') as string,
        telefone: formData.get('telefone') as string,
        profissao: formData.get('profissao') as string,
        bairro: formData.get('bairro') as string,
      };

      console.log('📤 Dados:', dados);

      const response = await fetch('/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        console.log('✅ Sucesso!');
        setCadastroRealizado(true);
      } else {
        alert('❌ Erro ao enviar cadastro');
      }
    } catch (error) {
      console.error('❌ Erro:', error);
      alert('❌ Erro de conexão');
    } finally {
      setCarregando(false);
    }
  };

  // Tela de sucesso
  if (cadastroRealizado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <header className="bg-gradient-to-br from-blue-600 to-blue-700 py-16 px-5 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              🎉 Cadastro Enviado com Sucesso!
            </h1>
            <p className="text-xl md:text-2xl mb-10 font-light">
              Seu cadastro foi enviado para <strong>análise</strong>. Nossa equipe entrará em contato via WhatsApp em até <strong>24 horas</strong> para ativar seu perfil.
            </p>
          </div>
        </header>

        <section className="py-20 px-5 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-6">📋</div>
              <h2 className="text-3xl font-bold mb-4 text-blue-600">Obrigado por se cadastrar!</h2>
              <p className="text-lg text-gray-600 mb-4">
                Seu cadastro foi enviado para <strong>análise</strong> por nossa equipe especializada.
              </p>
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                <p className="text-green-700 font-semibold flex items-center gap-2">
                  📞 <strong>Entraremos em contato via WhatsApp em até 24 horas</strong>
                </p>
                <p className="text-green-600 text-sm mt-1">
                  Após aprovação, você aparecerá nas buscas e começará a receber clientes
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                📋 Processo de Análise
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h4 className="font-semibold text-blue-700">Recebemos seu cadastro</h4>
                    <p className="text-gray-600 text-sm">Suas informações estão seguras conosco</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⏳</span>
                  <div>
                    <h4 className="font-semibold text-yellow-700">Análise em andamento</h4>
                    <p className="text-gray-600 text-sm">Verificamos os dados e serviços informados</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <h4 className="font-semibold text-purple-700">Contato em breve</h4>
                    <p className="text-gray-600 text-sm">Entraremos em contato para ativar seu perfil</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <h4 className="font-semibold text-green-700">Perfil ativo</h4>
                    <p className="text-gray-600 text-sm">Após aprovação, você aparecerá nas buscas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/buscar-profissional" 
                className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                🔍 Ver Como Apareço nas Buscas
              </Link>
              <Link 
                href="/" 
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                🏠 Voltar ao Início
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header Hero */}
      <header className="bg-gradient-to-br from-blue-600 to-blue-700 py-16 px-5 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 opacity-10 animate-pulse"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            👷 Cadastro de Profissional
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Conecte-se com clientes em <strong>Porto Velho - RO</strong> e receba mais serviços
          </p>
        </div>
      </header>

      {/* Formulário Principal */}
      <section className="py-16 px-5">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          {/* Dados Pessoais */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-3">
              📝 Seus Dados
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Nome Completo *</label>
                <input
                  type="text"
                  name="nome"
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label className="block font-semibold mb-2 text-gray-700">WhatsApp *</label>
                <input
                  type="tel"
                  name="telefone"
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="(69) 99999-9999"
                />
              </div>
              
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Profissão Principal *</label>
                <input
                  type="text"
                  name="profissao"
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Ex: Pedreiro, Pintor, Eletricista..."
                />
              </div>
              
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Bairro *</label>
                <input
                  type="text"
                  name="bairro"
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Seu bairro em Porto Velho"
                />
              </div>
            </div>
          </div>

          {/* Botão de Envio */}
          <div className="text-center">
            <button
              type="submit"
              disabled={carregando}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-4 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {carregando ? "Enviando..." : "🚀 Finalizar Cadastro"}
            </button>
            
            <p className="text-gray-500 mt-4 text-sm">
              Após o envio, analisaremos suas informações e entraremos em contato via WhatsApp
            </p>
          </div>
        </form>
      </section>
    </div>
  );
} 