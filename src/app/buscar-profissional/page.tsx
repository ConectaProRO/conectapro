"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaStar, FaWhatsapp, FaTimes, FaArrowUp, FaSearch, FaMapMarkerAlt, FaPhone, FaUserCheck } from "react-icons/fa";

const servicos = [
  "Forma e Concretagem",
  "Contra-Piso",
  "Porcelanato e Cerâmica",
  "Pintura",
  "Forro de Gesso",
  "Metalúrgica e Solda",
  "Reboco",
  "Alvenaria",
];

interface Profissional {
  id: string;
  nome: string;
  telefone: string;
  profissao: string;
  bairro: string;
  nivelServicos: Record<string, string>;
  transportes: string[];
  totalFotos: number;
  fotos?: string[];
  descricao?: string;
  experiencia?: string;
  preco?: string;
}

interface Avaliacao {
  id: string;
  clienteNome: string;
  nota: number;
  comentario: string;
  servico: string;
  timestamp: string;
}

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

export default function BuscarProfissional() {
  const [servicoSelecionado, setServicoSelecionado] = useState<string>("");
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<Profissional | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [mostrarModalAvaliacao, setMostrarModalAvaliacao] = useState(false);
  const [mediaAvaliacao, setMediaAvaliacao] = useState({ media: 0, total: 0 });
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    carregarProfissionais();
    
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

  const carregarProfissionais = async () => {
    try {
      const response = await fetch('/api/profissionais');
      if (response.ok) {
        const data = await response.json();
        setProfissionais(data);
      }
    } catch (error) {
      console.error('Erro ao carregar profissionais:', error);
    }
  };

  const carregarAvaliacoes = async (profissionalId: string) => {
    try {
      const [avaliacoesRes, mediaRes] = await Promise.all([
        fetch(`/api/avaliacoes?profissionalId=${profissionalId}`),
        fetch(`/api/avaliacoes/media?profissionalId=${profissionalId}`)
      ]);
      
      if (avaliacoesRes.ok) {
        const avaliacoesData = await avaliacoesRes.json();
        setAvaliacoes(avaliacoesData);
      }
      
      if (mediaRes.ok) {
        const mediaData = await mediaRes.json();
        setMediaAvaliacao(mediaData);
      }
    } catch (error) {
      console.error('Erro ao carregar avaliações:', error);
    }
  };

  const abrirDetalhes = (profissional: Profissional) => {
    setProfissionalSelecionado(profissional);
    carregarAvaliacoes(profissional.id);
  };

  const fecharDetalhes = () => {
    setProfissionalSelecionado(null);
    setAvaliacoes([]);
    setMediaAvaliacao({ media: 0, total: 0 });
  };

  const profissionaisFiltrados = profissionais.filter((prof) =>
    servicoSelecionado && prof.nivelServicos[servicoSelecionado]
  );

  const renderEstrelas = (nota: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar 
        key={i} 
        className={i < nota ? "text-yellow-400" : "text-gray-300"} 
        size={16}
      />
    ));
  };

  const formatarData = (timestamp: string) => {
    const data = new Date(timestamp);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  };

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
              🔍 Buscar Profissional
            </h1>
            <p className="text-xl md:text-2xl mb-10 font-light fade-in-element">
              Encontre os melhores profissionais da construção em <strong>Porto Velho - RO</strong>
            </p>
            
            <div className="max-w-2xl mx-auto fade-in-element">
              <div className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 text-lg">
                  <FaSearch className="text-2xl" />
                  <span>Profissionais verificados • Contato direto • Avaliações reais</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Formulário de Busca */}
        <section className="py-12 px-5">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 fade-in-element">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Qual serviço você precisa?</h2>
                <p className="text-gray-600">Selecione o tipo de serviço e encontre profissionais qualificados</p>
              </div>
              
              <div className="max-w-2xl mx-auto">
                <select
                  className="w-full border-2 border-gray-200 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-blue-500 transition-colors bg-white"
                  value={servicoSelecionado}
                  onChange={e => setServicoSelecionado(e.target.value)}
                >
                  <option value="">📋 Selecione um serviço...</option>
                  {servicos.map((servico) => (
                    <option key={servico} value={servico}>{servico}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Resultados da Busca */}
            {servicoSelecionado && (
              <div className="fade-in-element">
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-3">
                    🏗️ Profissionais de {servicoSelecionado}
                  </h2>
                  
                  {profissionaisFiltrados.length === 0 ? (
                    <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-white rounded-2xl">
                      <div className="text-6xl mb-6">🔍</div>
                      <h3 className="text-xl font-bold text-gray-600 mb-4">
                        Ainda não há profissionais aprovados para este serviço
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Seja o primeiro a se cadastrar e ganhe mais visibilidade!
                      </p>
                      <Link 
                        href="/cadastro-profissional" 
                        className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                      >
                        👷 Cadastrar como Profissional
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {profissionaisFiltrados.map((prof) => (
                        <div
                          key={prof.id}
                          onClick={() => abrirDetalhes(prof)}
                          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-gray-100 shadow-lg hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              {prof.fotos && prof.fotos.length > 0 ? (
                                <img 
                                  src={prof.fotos[0]} 
                                  alt="Foto serviço" 
                                  className="w-20 h-20 object-cover rounded-xl border-2 border-blue-200" 
                                />
                              ) : (
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                                  <FaUserCheck className="text-3xl text-blue-600" />
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-800 mb-2">{prof.nome}</h3>
                              <p className="text-blue-600 font-semibold mb-1">{prof.profissao}</p>
                              
                              <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <FaMapMarkerAlt className="text-blue-500" />
                                <span>{prof.bairro}</span>
                              </div>
                              
                              <div className="flex items-center gap-2 text-gray-600 mb-3">
                                <FaPhone className="text-green-500" />
                                <span>{prof.telefone}</span>
                              </div>
                              
                              {prof.nivelServicos[servicoSelecionado] && (
                                <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                  📊 {prof.nivelServicos[servicoSelecionado]}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                              👁️ Ver Detalhes Completos
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Call to Action para Profissionais */}
            {!servicoSelecionado && (
              <div className="bg-white rounded-3xl shadow-xl p-8 text-center fade-in-element">
                <div className="text-6xl mb-6">👷</div>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  Você é um profissional da construção?
                </h2>
                <p className="text-gray-600 mb-6">
                  Cadastre-se gratuitamente e conecte-se com clientes em Porto Velho
                </p>
                <Link 
                  href="/cadastro-profissional" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
                >
                  🚀 Cadastrar Agora
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Modal de Detalhes do Profissional */}
      {profissionalSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-3xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{profissionalSelecionado.nome}</h2>
                  <p className="text-blue-100 text-lg">{profissionalSelecionado.profissao}</p>
                </div>
                <button
                  onClick={fecharDetalhes}
                  className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Informações do Profissional */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    📍 Informações de Contato
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-blue-500" />
                      <span><strong>Bairro:</strong> {profissionalSelecionado.bairro}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaWhatsapp className="text-green-500" />
                      <span><strong>WhatsApp:</strong> {profissionalSelecionado.telefone}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    🚗 Transporte
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profissionalSelecionado.transportes.map((transporte) => (
                      <span key={transporte} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {transporte}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Nível de Serviços */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  🔧 Especialidades
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(profissionalSelecionado.nivelServicos).map(([servico, nivel]) => (
                    nivel !== "Não faço" && (
                      <div key={servico} className="flex justify-between items-center bg-white p-3 rounded-xl">
                        <span className="font-medium">{servico}</span>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {nivel}
                        </span>
                      </div>
                    )
                  ))}
                </div>
              </div>
              
              {/* Fotos */}
              {profissionalSelecionado.fotos && profissionalSelecionado.fotos.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    📸 Portfólio
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {profissionalSelecionado.fotos.map((foto, index) => (
                      <img
                        key={index}
                        src={foto}
                        alt={`Trabalho ${index + 1}`}
                        className="w-full h-32 object-cover rounded-xl border-2 border-gray-200"
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Avaliações */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    ⭐ Avaliações
                  </h3>
                  <button
                    onClick={() => setMostrarModalAvaliacao(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    + Avaliar
                  </button>
                </div>
                
                {mediaAvaliacao.total > 0 && (
                  <div className="bg-yellow-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex">{renderEstrelas(Math.round(mediaAvaliacao.media))}</div>
                      <span className="font-bold text-lg">{mediaAvaliacao.media.toFixed(1)}</span>
                      <span className="text-gray-600">({mediaAvaliacao.total} avaliações)</span>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {avaliacoes.length > 0 ? (
                    avaliacoes.map((avaliacao) => (
                      <div key={avaliacao.id} className="bg-white border border-gray-200 rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <div className="flex">{renderEstrelas(avaliacao.nota)}</div>
                            <span className="font-medium">{avaliacao.clienteNome}</span>
                          </div>
                          <span className="text-sm text-gray-500">{formatarData(avaliacao.timestamp)}</span>
                        </div>
                        <p className="text-gray-700 mb-1">{avaliacao.comentario}</p>
                        <p className="text-sm text-blue-600">Serviço: {avaliacao.servico}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">Ainda não há avaliações para este profissional.</p>
                  )}
                </div>
              </div>
              
              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/55${profissionalSelecionado.telefone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaWhatsapp /> Conversar no WhatsApp
                </a>
                <button
                  onClick={fecharDetalhes}
                  className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Avaliação */}
      {mostrarModalAvaliacao && profissionalSelecionado && (
        <ModalAvaliacao
          profissional={profissionalSelecionado}
          onClose={() => setMostrarModalAvaliacao(false)}
          onSuccess={() => {
            setMostrarModalAvaliacao(false);
            carregarAvaliacoes(profissionalSelecionado.id);
          }}
        />
      )}
    </>
  );
}

// Componente Modal de Avaliação
function ModalAvaliacao({ 
  profissional, 
  onClose, 
  onSuccess 
}: { 
  profissional: Profissional;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState('');
  const [clienteNome, setClienteNome] = useState('');
  const [servicoAvaliado, setServicoAvaliado] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const response = await fetch('/api/avaliacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profissionalId: profissional.id,
          clienteNome,
          nota,
          comentario,
          servico: servicoAvaliado,
        }),
      });

      if (response.ok) {
        alert('Avaliação enviada com sucesso!');
        onSuccess();
      } else {
        alert('Erro ao enviar avaliação. Tente novamente.');
      }
    } catch (error) {
      alert('Erro ao enviar avaliação. Verifique sua conexão.');
    } finally {
      setEnviando(false);
    }
  };

  const renderEstrelas = (nota: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`cursor-pointer text-2xl transition-colors ${
          i < nota ? "text-yellow-400" : "text-gray-300"
        }`}
        onClick={() => setNota(i + 1)}
      />
    ));
  };

  const servicosDisponiveis = Object.entries(profissional.nivelServicos)
    .filter(([, nivel]) => nivel !== "Não faço")
    .map(([servico]) => servico);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600">Avaliar {profissional.nome}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-2">Seu nome</label>
            <input
              type="text"
              value={clienteNome}
              onChange={(e) => setClienteNome(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Serviço avaliado</label>
            <select
              value={servicoAvaliado}
              onChange={(e) => setServicoAvaliado(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
              required
            >
              <option value="">Selecione o serviço</option>
              {servicosDisponiveis.map((servico) => (
                <option key={servico} value={servico}>{servico}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">Nota</label>
            <div className="flex gap-1">{renderEstrelas(nota)}</div>
          </div>

          <div>
            <label className="block font-semibold mb-2">Comentário</label>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors h-32 resize-none"
              placeholder="Conte como foi sua experiência..."
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={enviando}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {enviando ? 'Enviando...' : 'Enviar Avaliação'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 