"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaUpload, FaPaintRoller, FaTools, FaCogs, FaBrush, FaHardHat, FaWrench, FaCubes, FaThLarge, FaArrowUp } from "react-icons/fa";

const servicos = [
  { nome: "Forma e Concretagem", icon: <FaCubes /> },
  { nome: "Contra-Piso", icon: <FaThLarge /> },
  { nome: "Porcelanato e Cerâmica", icon: <FaTools /> },
  { nome: "Pintura", icon: <FaPaintRoller /> },
  { nome: "Forro de Gesso", icon: <FaBrush /> },
  { nome: "Metalúrgica e Solda", icon: <FaWrench /> },
  { nome: "Reboco", icon: <FaHardHat /> },
  { nome: "Alvenaria", icon: <FaCogs /> },
];

const niveis = [
  { label: "Não faço", emoji: "❌", cor: "bg-gray-200 text-gray-600" },
  { label: "Meia colher", emoji: "🥄", cor: "bg-yellow-100 text-yellow-700" },
  { label: "Colher cheia", emoji: "🥄🥄", cor: "bg-yellow-200 text-yellow-800" },
  { label: "Profissional", emoji: "👷", cor: "bg-blue-100 text-blue-700" },
  { label: "Especialista", emoji: "⭐", cor: "bg-green-100 text-green-700" },
];

const transportes = [
  "A pé",
  "Bicicleta",
  "Moto",
  "Carro",
  "Ônibus",
];

// Componente do botão flutuante para voltar ao topo
function BotaoVoltarTopo() {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setMostrar(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const voltarAoTopo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!mostrar) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={voltarAoTopo}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 fade-in-element"
        title="Voltar ao topo"
      >
        <FaArrowUp size={20} />
      </button>
    </div>
  );
}

export default function CadastroProfissional() {
  const [nivelServicos, setNivelServicos] = useState<{ [key: string]: string }>({});
  const [meiosTransporte, setMeiosTransporte] = useState<string[]>([]);
  const [fotos, setFotos] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [cadastroRealizado, setCadastroRealizado] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Progresso simples: 1/3 dados, 2/3 serviços, 3/3 fotos
  const progresso = Math.round(
    (Object.keys(nivelServicos).length / servicos.length) * 50 +
    (fotos.length > 0 ? 25 : 0) +
    (meiosTransporte.length > 0 ? 25 : 0)
  );

  useEffect(() => {
    // Configuração do observer para animações
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    }, observerOptions);

    // Observar todos os elementos com a classe de animação
    const elements = document.querySelectorAll('.fade-in-element');
    elements.forEach(el => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleNivelClick = (servico: string, nivel: string) => {
    setNivelServicos((prev) => ({ ...prev, [servico]: nivel }));
  };

  const handleTransporteChange = (transporte: string) => {
    setMeiosTransporte((prev) =>
      prev.includes(transporte)
        ? prev.filter((t) => t !== transporte)
        : [...prev, transporte]
    );
  };

  const handleFotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFotos(filesArray);
      setPreviewUrls(filesArray.map(file => URL.createObjectURL(file)));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    
    try {
      // Coletar dados do formulário
      const formData = new FormData(e.target as HTMLFormElement);
      const dadosCadastro = {
        nome: formData.get('nome'),
        telefone: formData.get('telefone'),
        profissao: formData.get('profissao'),
        bairro: formData.get('bairro'),
        nivelServicos,
        meiosTransporte,
        numeroFotos: fotos.length,
        timestamp: new Date().toISOString()
      };

      // Enviar para API
      const response = await fetch('/api/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosCadastro),
      });

      if (response.ok) {
        setCadastroRealizado(true);
      } else {
        alert('Erro ao enviar cadastro. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar cadastro. Verifique sua conexão.');
    } finally {
      setCarregando(false);
    }
  };

  // Tela de sucesso
  if (cadastroRealizado) {
    return (
      <>
        {/* CSS personalizado para animações */}
        <style jsx global>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease forwards;
          }
          
          .fade-in-element {
            opacity: 0;
            transform: translateY(30px);
          }
        `}</style>

        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
          {/* Header Hero */}
          <header className="bg-gradient-to-br from-blue-600 to-blue-700 py-16 px-5 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600 opacity-10 animate-pulse"></div>
            <div className="max-w-4xl mx-auto relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in-element">
                🎉 Cadastro Enviado com Sucesso!
              </h1>
              <p className="text-xl md:text-2xl mb-10 font-light fade-in-element">
                Recebemos suas informações e entraremos em contato em breve para ativar seu perfil profissional.
              </p>
            </div>
          </header>

          {/* Conteúdo Principal */}
          <section className="py-20 px-5 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 fade-in-element">
              <div className="text-center mb-8">
                <div className="text-6xl mb-6">📋</div>
                <h2 className="text-3xl font-bold mb-4 text-blue-600">Obrigado por se cadastrar!</h2>
                <p className="text-lg text-gray-600">
                  Seu cadastro está sendo analisado por nossa equipe. Em breve você estará conectado com clientes em Porto Velho.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 mb-8 fade-in-element">
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

              <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-element">
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
      </>
    );
  }

  return (
    <>
      {/* CSS personalizado para animações */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease forwards;
        }
        
        .fade-in-element {
          opacity: 0;
          transform: translateY(30px);
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Botão flutuante para voltar ao topo */}
      <BotaoVoltarTopo />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        {/* Header Hero */}
        <header className="bg-gradient-to-br from-blue-600 to-blue-700 py-16 px-5 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600 opacity-10 animate-pulse"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in-element">
              👷 Cadastro de Profissional
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light fade-in-element">
              Conecte-se com clientes em <strong>Porto Velho - RO</strong> e receba mais serviços
            </p>
            
            {/* Barra de progresso */}
            <div className="max-w-md mx-auto bg-white bg-opacity-20 rounded-full p-1 fade-in-element">
              <div className="h-3 bg-white rounded-full transition-all duration-500" style={{ width: `${progresso}%` }} />
            </div>
            <div className="text-sm mt-2 opacity-90 fade-in-element">
              Progresso: {progresso}% completo
            </div>
          </div>
        </header>

        {/* Formulário Principal */}
        <section className="py-16 px-5">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            {/* Dados Pessoais */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 fade-in-element">
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

            {/* Serviços */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 fade-in-element">
              <h2 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-3">
                🔧 Seus Serviços
              </h2>
              <p className="text-gray-600 mb-6">
                Selecione seu nível de habilidade em cada serviço:
              </p>
              
              <div className="space-y-6">
                {servicos.map((servico) => (
                  <div key={servico.nome} className="border-2 border-gray-100 rounded-2xl p-6 hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl text-blue-600">{servico.icon}</span>
                      <h3 className="text-lg font-semibold text-gray-800">{servico.nome}</h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      {niveis.map((nivel) => (
                        <button
                          key={nivel.label}
                          type="button"
                          onClick={() => handleNivelClick(servico.nome, nivel.label)}
                          className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                            nivelServicos[servico.nome] === nivel.label
                              ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                              : nivel.cor + ' hover:shadow-md hover:scale-105'
                          }`}
                        >
                          {nivel.emoji} {nivel.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transporte */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 fade-in-element">
              <h2 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-3">
                🚗 Como você se desloca?
              </h2>
              
              <div className="flex flex-wrap gap-4">
                {transportes.map((transporte) => (
                  <label key={transporte} className="cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={meiosTransporte.includes(transporte)}
                      onChange={() => handleTransporteChange(transporte)}
                    />
                    <div className={`px-6 py-3 rounded-xl font-medium border-2 transition-all duration-200 ${
                      meiosTransporte.includes(transporte)
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg transform scale-105'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md hover:scale-105'
                    }`}>
                      {transporte}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Fotos */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 fade-in-element">
              <h2 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-3">
                📸 Fotos dos seus trabalhos
              </h2>
              <p className="text-gray-600 mb-6">
                Adicione fotos dos seus melhores trabalhos para atrair mais clientes:
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="fotos"
                  multiple
                  accept="image/*"
                  onChange={handleFotosChange}
                  className="hidden"
                />
                <label htmlFor="fotos" className="cursor-pointer block">
                  <FaUpload className="mx-auto text-4xl text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-600 mb-2">
                    Clique para adicionar fotos
                  </p>
                  <p className="text-sm text-gray-500">
                    {fotos.length} foto(s) selecionada(s)
                  </p>
                </label>
              </div>
              
              {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {previewUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-xl border-2 border-gray-200"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Botão de Envio */}
            <div className="text-center fade-in-element">
              <button
                type="submit"
                disabled={carregando}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-4 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {carregando ? "Enviando..." : "🚀 Finalizar Cadastro"}
              </button>
              
              <p className="text-gray-500 mt-4 text-sm">
                Após o envio, analisaremos suas informações e entraremos em contato
              </p>
            </div>
          </form>
        </section>
      </div>
    </>
  );
} 