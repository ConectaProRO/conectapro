"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaStar, FaWhatsapp, FaTimes, FaArrowUp, FaSearch, FaMapMarkerAlt, FaPhone, FaUserCheck } from "react-icons/fa";
import PageLayout, { PageCard, PageButton } from "../../components/PageLayout";

const servicos = [
  "Forma e Concretagem",
  "Contra-Piso",
  "Cerâmica e Porcelanato",
  "Alvenaria",
  "Reboco",
  "Instalações Hidrosanitárias",
  "Instalações Elétricas",
  "Forro de Gesso",
];

interface Profissional {
  id: string;
  nome: string;
  telefone: string;
  profissao: string;
  bairro: string;
  servicosSelecionados: string[]; // Novo sistema
  transportes: string[];
  totalFotos: number;
  fotos?: string[];
  fotoPerfil?: string; // Foto de perfil em base64
  visivelNoSite?: boolean; // Controla se aparece no site
  descricao?: string;
  experiencia?: string;
  preco?: string;
  temFotoPerfil?: boolean;
  numeroFotosGaleria?: number;
  // Compatibilidade com dados antigos
  nivelServicos?: Record<string, string>;
  meiosTransporte?: string[];
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
        className="cp-button-primary rounded-full p-3 shadow-lg"
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


  useEffect(() => {
    carregarProfissionais();
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

  const profissionaisFiltrados = profissionais.filter((prof) => {
    if (!servicoSelecionado) return false;
    
    // Novo sistema: verificar se o serviço está na lista
    if (prof.servicosSelecionados && prof.servicosSelecionados.includes(servicoSelecionado)) {
      return true;
    }
    
    // Sistema antigo: verificar nivelServicos para compatibilidade
    if (prof.nivelServicos && prof.nivelServicos[servicoSelecionado]) {
      return true;
    }
    
    return false;
  });

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
    <PageLayout 
      title="🔍 Buscar Profissionais"
      subtitle="Encontre profissionais qualificados da construção civil em Porto Velho"
    >
      <BotaoVoltarTopo />

      {/* Seção de busca */}
      <PageCard>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold cp-text-gradient mb-4">
            <FaSearch className="inline mr-3" />
            Encontre o Profissional Ideal
          </h2>
          <p className="text-xl text-gray-600">
            Selecione o serviço que você precisa e veja todos os profissionais disponíveis
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            Qual serviço você precisa?
          </label>
          <select
            value={servicoSelecionado}
            onChange={(e) => setServicoSelecionado(e.target.value)}
            className="w-full p-4 border-2 cp-border-figma rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Selecione um serviço...</option>
            {servicos.map((servico) => (
              <option key={servico} value={servico}>
                {servico}
              </option>
            ))}
          </select>
        </div>
      </PageCard>

      {/* Resultados da busca */}
      {servicoSelecionado && (
        <PageCard>
          <div className="mb-6">
            <h2 className="text-2xl font-bold cp-text-gradient mb-2">
              Profissionais encontrados para: {servicoSelecionado}
            </h2>
            <p className="text-gray-600">
              {profissionaisFiltrados.length} profissional(is) disponível(is)
            </p>
          </div>

          {profissionaisFiltrados.length === 0 ? (
            <div className="text-center py-12 cp-bg-figma-light rounded-2xl">
              <FaSearch className="text-6xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">
                Nenhum profissional encontrado
              </h3>
              <p className="text-gray-500 mb-6">
                Não encontramos profissionais para este serviço no momento.
              </p>
              <PageButton href="/cadastro-profissional" variant="primary">
                👷 Seja um profissional cadastrado
              </PageButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profissionaisFiltrados.map((profissional) => (
                <div
                  key={profissional.id}
                  className="cp-bg-figma-light rounded-2xl p-6 cp-border-figma hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => abrirDetalhes(profissional)}
                >
                  <div className="text-center mb-4">
                    {profissional.fotoPerfil ? (
                      <img
                        src={profissional.fotoPerfil}
                        alt={`Foto de ${profissional.nome}`}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full cp-gradient-figma-primary flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl shadow-lg">
                        {profissional.nome.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {profissional.nome}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      <FaMapMarkerAlt className="inline mr-1" />
                      {profissional.bairro}
                    </p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaUserCheck className="mr-2 text-green-500" />
                      {profissional.profissao}
                    </div>
                    {profissional.totalFotos > 0 && (
                      <div className="text-sm text-gray-600">
                        📸 {profissional.totalFotos} foto(s) de trabalhos
                      </div>
                    )}
                  </div>

                  <PageButton variant="primary" className="w-full">
                    Ver Detalhes
                  </PageButton>
                </div>
              ))}
            </div>
          )}
        </PageCard>
      )}

      {/* Modal de detalhes do profissional */}
      {profissionalSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-screen overflow-y-auto relative">
            <button
              onClick={fecharDetalhes}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="text-xl text-gray-500" />
            </button>

            <div className="text-center mb-8">
              {profissionalSelecionado.fotoPerfil ? (
                <img
                  src={profissionalSelecionado.fotoPerfil}
                  alt={`Foto de ${profissionalSelecionado.nome}`}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-blue-200 shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full cp-gradient-figma-primary flex items-center justify-center mx-auto mb-4 text-white font-bold text-3xl shadow-lg">
                  {profissionalSelecionado.nome.charAt(0).toUpperCase()}
                </div>
              )}
              <h2 className="text-3xl font-bold cp-text-gradient mb-2">
                {profissionalSelecionado.nome}
              </h2>
              <p className="text-xl text-gray-600">
                <FaMapMarkerAlt className="inline mr-2" />
                {profissionalSelecionado.bairro}
              </p>
            </div>

            {/* Informações do profissional */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="cp-bg-figma-light rounded-2xl p-6">
                <h3 className="text-xl font-bold cp-text-gradient mb-4">
                  Informações Profissionais
                </h3>
                <div className="space-y-3">
                  <div>
                    <strong>Profissão:</strong> {profissionalSelecionado.profissao}
                  </div>
                  {profissionalSelecionado.experiencia && (
                    <div>
                      <strong>Experiência:</strong> {profissionalSelecionado.experiencia}
                    </div>
                  )}
                  {profissionalSelecionado.preco && (
                    <div>
                      <strong>Faixa de Preço:</strong> {profissionalSelecionado.preco}
                    </div>
                  )}
                  {profissionalSelecionado.descricao && (
                    <div>
                      <strong>Descrição:</strong> {profissionalSelecionado.descricao}
                    </div>
                  )}
                </div>
              </div>

              <div className="cp-bg-figma-light rounded-2xl p-6">
                <h3 className="text-xl font-bold cp-text-gradient mb-4">
                  Serviços Oferecidos
                </h3>
                <div className="space-y-2">
                  {(profissionalSelecionado.servicosSelecionados || 
                    Object.keys(profissionalSelecionado.nivelServicos || {})).map((servico) => (
                    <div key={servico} className="flex items-center">
                      <FaUserCheck className="text-green-500 mr-2" />
                      <span>{servico}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Avaliações */}
            {mediaAvaliacao.total > 0 && (
              <div className="cp-bg-figma-light rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-bold cp-text-gradient mb-4">
                  Avaliações dos Clientes
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex">
                    {renderEstrelas(Math.round(mediaAvaliacao.media))}
                  </div>
                  <span className="text-lg font-semibold">
                    {mediaAvaliacao.media.toFixed(1)} / 5.0
                  </span>
                  <span className="text-gray-600">
                    ({mediaAvaliacao.total} avaliação{mediaAvaliacao.total > 1 ? 'ões' : ''})
                  </span>
                </div>

                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {avaliacoes.map((avaliacao) => (
                    <div key={avaliacao.id} className="bg-white rounded-xl p-4 border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <strong>{avaliacao.clienteNome}</strong>
                          <div className="flex">
                            {renderEstrelas(avaliacao.nota)}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatarData(avaliacao.timestamp)}
                        </span>
                      </div>
                      <p className="text-gray-700">{avaliacao.comentario}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Serviço: {avaliacao.servico}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio de fotos */}
            {profissionalSelecionado.fotos && profissionalSelecionado.fotos.length > 0 && (
              <div className="cp-bg-figma-light rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-bold cp-text-gradient mb-4">
                  Portfolio de Trabalhos
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {profissionalSelecionado.fotos.map((foto, index) => (
                    <img
                      key={index}
                      src={foto}
                      alt={`Trabalho ${index + 1}`}
                      className="w-full h-32 object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PageButton 
                href={`https://wa.me/55${profissionalSelecionado.telefone.replace(/\D/g, '')}?text=Olá! Vi seu perfil no ConectaPro e gostaria de conversar sobre o serviço de ${servicoSelecionado}.`}
                variant="primary"
                className="text-center"
              >
                <FaWhatsapp className="mr-2" />
                Chamar no WhatsApp
              </PageButton>
              
              <PageButton 
                onClick={() => setMostrarModalAvaliacao(true)}
                variant="secondary"
              >
                <FaStar className="mr-2" />
                Avaliar Profissional
              </PageButton>
            </div>
          </div>
        </div>
      )}

      {/* Modal de avaliação */}
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
    </PageLayout>
  );
}

// Modal de avaliação (mantendo a funcionalidade original)
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
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const response = await fetch('/api/avaliacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profissionalId: profissional.id,
          profissionalNome: profissional.nome,
          clienteNome,
          nota,
          comentario,
          servico: 'Serviço contratado'
        }),
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
    } finally {
      setEnviando(false);
    }
  };

  const renderEstrelas = (nota: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`cursor-pointer text-2xl ${i < nota ? 'text-yellow-400' : 'text-gray-300'}`}
        onClick={() => setNota(i + 1)}
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold cp-text-gradient mb-2">
            Avaliar Profissional
          </h3>
          <p className="text-gray-600">{profissional.nome}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Seu nome:
            </label>
            <input
              type="text"
              value={clienteNome}
              onChange={(e) => setClienteNome(e.target.value)}
              required
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu nome"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Sua avaliação:
            </label>
            <div className="flex justify-center gap-1">
              {renderEstrelas(nota)}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Comentário:
            </label>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              required
              rows={4}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Conte como foi sua experiência..."
            />
          </div>

                     <div className="flex gap-4">
             <button
               type="button"
               onClick={onClose}
               className="cp-button-secondary flex-1"
             >
               Cancelar
             </button>
             <button
               type="submit"
               disabled={enviando}
               className="cp-button-primary flex-1"
             >
               {enviando ? 'Enviando...' : 'Enviar Avaliação'}
             </button>
           </div>
        </form>
      </div>
    </div>
  );
} 