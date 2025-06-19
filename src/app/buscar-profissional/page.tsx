"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft, FaStar, FaWhatsapp, FaTimes } from "react-icons/fa";

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

export default function BuscarProfissional() {
  const [servicoSelecionado, setServicoSelecionado] = useState<string>("");
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<Profissional | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [carregando, setCarregando] = useState(false);
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
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-white to-gray-100 p-4">
      <div className="w-full max-w-2xl flex items-center mb-4">
        <Link href="/" className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold text-lg px-4 py-2 rounded-xl bg-white shadow border border-gray-100 transition-all">
          <FaArrowLeft /> Voltar
        </Link>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Buscar Profissional</h1>
        
        <div className="mb-6">
          <label className="block font-semibold mb-2">Qual serviço você precisa?</label>
          <select
            className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={servicoSelecionado}
            onChange={e => setServicoSelecionado(e.target.value)}
          >
            <option value="">Selecione um serviço</option>
            {servicos.map((servico) => (
              <option key={servico} value={servico}>{servico}</option>
            ))}
          </select>
        </div>
        
        {servicoSelecionado && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Profissionais encontrados:</h2>
            {profissionaisFiltrados.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Ainda não há profissionais aprovados para este serviço.</p>
                <p className="text-sm text-blue-600">Seja o primeiro a se cadastrar e ganhe mais visibilidade!</p>
                <Link href="/cadastro-profissional" className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Cadastrar como Profissional
                </Link>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profissionaisFiltrados.map((prof) => (
                <div
                  key={prof.id}
                  onClick={() => abrirDetalhes(prof)}
                  className="bg-gray-50 rounded-xl p-3 border border-gray-200 shadow-sm flex items-center gap-3 min-h-[90px] hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex-shrink-0">
                    {prof.fotos && prof.fotos.length > 0 ? (
                      <img src={prof.fotos[0]} alt="Foto serviço" className="w-16 h-16 object-cover rounded-lg border" />
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-lg text-gray-400 text-xs">Sem foto</div>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-1 min-w-0">
                    <span className="font-bold text-base text-gray-800 truncate">{prof.nome}</span>
                    <span className="text-xs text-gray-600 truncate">Bairro: {prof.bairro}</span>
                    <span className="text-xs text-gray-600 truncate">
                      Nível: <b>{prof.nivelServicos[servicoSelecionado]}</b>
                    </span>
                  </div>
                  
                  {prof.fotos && prof.fotos.length > 1 && (
                    <div className="flex flex-col gap-1 ml-2">
                      {prof.fotos.slice(1, 3).map((foto, i) => (
                        <img key={i} src={foto} alt="Foto extra" className="w-7 h-7 object-cover rounded border" />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal de Detalhes do Profissional */}
      {profissionalSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-2xl font-bold">{profissionalSelecionado.nome}</h2>
              <button 
                onClick={fecharDetalhes}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="p-6">
              {/* Informações básicas */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-600">Profissão:</span>
                    <p className="font-semibold">{profissionalSelecionado.profissao}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Bairro:</span>
                    <p className="font-semibold">{profissionalSelecionado.bairro}</p>
                  </div>
                </div>
                
                {profissionalSelecionado.experiencia && (
                  <div className="mb-4">
                    <span className="text-sm text-gray-600">Experiência:</span>
                    <p className="font-semibold">{profissionalSelecionado.experiencia}</p>
                  </div>
                )}
                
                {profissionalSelecionado.preco && (
                  <div className="mb-4">
                    <span className="text-sm text-gray-600">Faixa de Preço:</span>
                    <p className="font-semibold">{profissionalSelecionado.preco}</p>
                  </div>
                )}
              </div>

              {/* Avaliações */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-semibold">Avaliações</h3>
                  {mediaAvaliacao.total > 0 && (
                    <div className="flex items-center gap-1">
                      <div className="flex">{renderEstrelas(Math.round(mediaAvaliacao.media))}</div>
                      <span className="text-sm text-gray-600">
                        {mediaAvaliacao.media.toFixed(1)} ({mediaAvaliacao.total} avaliações)
                      </span>
                    </div>
                  )}
                </div>
                
                {avaliacoes.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Ainda não há avaliações para este profissional.</p>
                ) : (
                  <div className="space-y-4 max-h-60 overflow-y-auto">
                    {avaliacoes.map((avaliacao) => (
                      <div key={avaliacao.id} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{avaliacao.clienteNome}</span>
                            <div className="flex">{renderEstrelas(avaliacao.nota)}</div>
                          </div>
                          <span className="text-xs text-gray-500">{formatarData(avaliacao.timestamp)}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">{avaliacao.comentario}</p>
                        <p className="text-xs text-gray-500">Serviço: {avaliacao.servico}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setMostrarModalAvaliacao(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Deixar Avaliação
                  </button>
                </div>
              </div>

              {/* Contato */}
              <div className="border-t pt-6">
                <a
                  href={`https://wa.me/55${profissionalSelecionado.telefone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  <FaWhatsapp size={20} />
                  Entrar em Contato via WhatsApp
                </a>
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
    </div>
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
  const [formData, setFormData] = useState({
    clienteNome: '',
    clienteTelefone: '',
    nota: 5,
    comentario: '',
    servico: ''
  });
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const response = await fetch('/api/avaliacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          profissionalId: profissional.id
        })
      });

      if (response.ok) {
        onSuccess();
        alert('Avaliação enviada! Será analisada antes da publicação.');
      }
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      alert('Erro ao enviar avaliação. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  const renderEstrelas = (nota: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar 
        key={i}
        onClick={() => setFormData(prev => ({ ...prev, nota: i + 1 }))}
        className={`cursor-pointer ${i < nota ? "text-yellow-400" : "text-gray-300"}`}
        size={24}
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Avaliar {profissional.nome}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Seu nome:</label>
            <input
              type="text"
              required
              value={formData.clienteNome}
              onChange={(e) => setFormData(prev => ({ ...prev, clienteNome: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Seu telefone:</label>
            <input
              type="tel"
              required
              value={formData.clienteTelefone}
              onChange={(e) => setFormData(prev => ({ ...prev, clienteTelefone: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Qual serviço foi realizado?</label>
            <select
              required
              value={formData.servico}
              onChange={(e) => setFormData(prev => ({ ...prev, servico: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Selecione o serviço</option>
              {servicos.map(servico => (
                <option key={servico} value={servico}>{servico}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Sua avaliação:</label>
            <div className="flex gap-1 mb-2">
              {renderEstrelas(formData.nota)}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Comentário:</label>
            <textarea
              required
              value={formData.comentario}
              onChange={(e) => setFormData(prev => ({ ...prev, comentario: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 h-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Conte como foi sua experiência..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={enviando}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {enviando ? 'Enviando...' : 'Enviar Avaliação'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 