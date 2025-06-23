'use client';

import { useState, useEffect } from 'react';

interface ConversationState {
  phoneNumber: string;
  currentStep: string;
  userData: {
    nome?: string;
    telefone?: string;
    tipoTrabalho?: string;
    experiencia?: string;
    cidade?: string;
    fotoPerfil?: string;
    fotosPortfolio?: string[];
  };
  startedAt: string;
  lastActivity: string;
  isComplete: boolean;
}

interface ConversationStats {
  total: number;
  active: number;
  completed: number;
  today: number;
}

export default function WhatsAppBotAdminPage() {
  const [conversations, setConversations] = useState<ConversationState[]>([]);
  const [stats, setStats] = useState<ConversationStats>({
    total: 0,
    active: 0,
    completed: 0,
    today: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<ConversationState | null>(null);

  useEffect(() => {
    fetchConversations();
    fetchStats();
    
    // Refresh every 30 seconds
    const interval = setInterval(() => {
      fetchConversations();
      fetchStats();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await fetch('/api/admin/whatsapp-conversations');
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/whatsapp-stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('55')) {
      const number = cleaned.slice(2);
      return `(${number.slice(0, 2)}) ${number.slice(2, 7)}-${number.slice(7)}`;
    }
    return phone;
  };

  const getStepDescription = (step: string) => {
    const steps: { [key: string]: string } = {
      'greeting': '👋 Saudação inicial',
      'name': '👤 Coletando nome',
      'phone_confirmation': '📱 Confirmando telefone',
      'work_type': '🔨 Tipo de trabalho',
      'experience': '⏰ Experiência',
      'profile_photo': '📸 Foto de perfil',
      'portfolio_photos': '🖼️ Fotos de trabalhos',
      'location_confirmation': '📍 Confirmando localização',
      'final_confirmation': '✅ Confirmação final',
      'completed': '🎉 Concluído'
    };
    return steps[step] || step;
  };

  const getStepProgress = (step: string) => {
    const stepOrder = [
      'greeting', 'name', 'phone_confirmation', 'work_type', 
      'experience', 'profile_photo', 'portfolio_photos', 
      'location_confirmation', 'final_confirmation', 'completed'
    ];
    const currentIndex = stepOrder.indexOf(step);
    return Math.round((currentIndex / (stepOrder.length - 1)) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando conversas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              🤖 WhatsApp Bot - Admin
            </h1>
            <p className="mt-2 text-gray-600">
              Monitore conversas de cadastro por áudio
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">🟢</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ativas</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Concluídas</p>
                <p className="text-2xl font-bold text-purple-600">{stats.completed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-2xl">📅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hoje</p>
                <p className="text-2xl font-bold text-orange-600">{stats.today}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Conversations List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Conversas Ativas ({conversations.length})
            </h2>
          </div>

          {conversations.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🤖</span>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma conversa ativa
              </h3>
              <p className="text-gray-600">
                As conversas aparecerão aqui quando os usuários começarem a interagir com o bot.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {conversations.map((conversation, index) => (
                <div
                  key={conversation.phoneNumber}
                  className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-semibold">
                              {conversation.userData.nome?.charAt(0) || '?'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {conversation.userData.nome || 'Nome não informado'}
                            </p>
                            <span className="text-xs text-gray-500">
                              {formatPhoneNumber(conversation.phoneNumber)}
                            </span>
                          </div>
                          
                          <div className="mt-1 flex items-center space-x-2">
                            <span className="text-sm text-gray-600">
                              {getStepDescription(conversation.currentStep)}
                            </span>
                            {conversation.userData.tipoTrabalho && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                {conversation.userData.tipoTrabalho}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${getStepProgress(conversation.currentStep)}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 font-medium">
                            {getStepProgress(conversation.currentStep)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 text-right">
                      <p className="text-sm text-gray-500">
                        {new Date(conversation.lastActivity).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {Math.round((Date.now() - new Date(conversation.lastActivity).getTime()) / 60000)}min atrás
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Conversation Detail Modal */}
      {selectedConversation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Detalhes da Conversa
                </h3>
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Fechar</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Telefone</label>
                  <p className="mt-1 text-sm text-gray-900">{formatPhoneNumber(selectedConversation.phoneNumber)}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Etapa Atual</label>
                  <p className="mt-1 text-sm text-gray-900">{getStepDescription(selectedConversation.currentStep)}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dados Coletados</label>
                  <div className="mt-1 bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                      {JSON.stringify(selectedConversation.userData, null, 2)}
                    </pre>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Iniciada em</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedConversation.startedAt).toLocaleString('pt-BR')}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Última atividade</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedConversation.lastActivity).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 