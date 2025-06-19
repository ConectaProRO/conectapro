"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaUpload, FaPaintRoller, FaTools, FaCogs, FaBrush, FaHardHat, FaWrench, FaCubes, FaThLarge, FaArrowUp, FaUser, FaCamera, FaTimes } from "react-icons/fa";

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
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        title="Voltar ao topo"
      >
        <FaArrowUp size={20} />
      </button>
    </div>
  );
}

export default function CadastroProfissional() {
  const [servicosSelecionados, setServicosSelecionados] = useState<string[]>([]);
  const [meiosTransporte, setMeiosTransporte] = useState<string[]>([]);
  const [experiencia, setExperiencia] = useState("");
  
  // Estados para foto de perfil
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [previewFotoPerfil, setPreviewFotoPerfil] = useState<string>("");
  
  // Estados para galeria de serviços
  const [fotosGaleria, setFotosGaleria] = useState<File[]>([]);
  const [previewsGaleria, setPreviewsGaleria] = useState<string[]>([]);
  
  const [cadastroRealizado, setCadastroRealizado] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [mostrarAviso, setMostrarAviso] = useState(false);
  // Progresso atualizado: dados pessoais, foto perfil, serviços, experiência, transporte, galeria
  const progresso = Math.round(
    20 + // dados básicos sempre conta
    (fotoPerfil ? 15 : 0) + // foto de perfil
    (servicosSelecionados.length / servicos.length) * 25 + // serviços
    (experiencia ? 10 : 0) + // experiência
    (meiosTransporte.length > 0 ? 15 : 0) + // transporte
    (fotosGaleria.length > 0 ? 15 : 0) // galeria
  );

  const handleServicoChange = (servico: string) => {
    setServicosSelecionados((prev) =>
      prev.includes(servico)
        ? prev.filter((s) => s !== servico)
        : [...prev, servico]
    );
  };

  const handleTransporteChange = (transporte: string) => {
    setMeiosTransporte((prev) =>
      prev.includes(transporte)
        ? prev.filter((t) => t !== transporte)
        : [...prev, transporte]
    );
  };

  // Handler para foto de perfil
  const handleFotoPerfilChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFotoPerfil(file);
      setPreviewFotoPerfil(URL.createObjectURL(file));
    }
  };

  // Handler para galeria de serviços
  const handleGaleriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      // Validar arquivos
      const validFiles = filesArray.filter(file => {
        const isImage = file.type.startsWith('image/');
        const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
        
        if (!isImage) {
          console.warn('Arquivo ignorado - não é uma imagem:', file.name);
        }
        if (!isValidSize) {
          console.warn('Arquivo ignorado - muito grande:', file.name, file.size);
        }
        
        return isImage && isValidSize;
      });

      if (validFiles.length !== filesArray.length) {
        alert('⚠️ Alguns arquivos foram ignorados. Use apenas imagens (JPG, PNG, WEBP) menores que 5MB.');
      }

      // Adicionar arquivos válidos
      setFotosGaleria(prev => [...prev, ...validFiles]);
      
      // Criar previews com validação adicional
      const newPreviews: string[] = [];
      
      validFiles.forEach(file => {
        try {
          const objectURL = URL.createObjectURL(file);
          newPreviews.push(objectURL);
          console.log('✅ Preview criado para:', file.name);
        } catch (error) {
          console.error('❌ Erro ao criar preview para:', file.name, error);
        }
      });
      
      setPreviewsGaleria(prev => [...prev, ...newPreviews]);
      
      // Limpar o input para permitir selecionar os mesmos arquivos novamente
      e.target.value = '';
    }
  };

  // Remover foto da galeria
  const removerFotoGaleria = (index: number) => {
    // Limpar URL do preview para evitar vazamento de memória
    const previewToRemove = previewsGaleria[index];
    if (previewToRemove) {
      URL.revokeObjectURL(previewToRemove);
    }
    
    setFotosGaleria(prev => prev.filter((_, i) => i !== index));
    setPreviewsGaleria(prev => prev.filter((_, i) => i !== index));
  };

  // Remover foto de perfil
  const removerFotoPerfil = () => {
    // Limpar URL do preview para evitar vazamento de memória
    if (previewFotoPerfil) {
      URL.revokeObjectURL(previewFotoPerfil);
    }
    
    setFotoPerfil(null);
    setPreviewFotoPerfil("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Iniciando envio do cadastro completo...');
    setCarregando(true);
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const dados = {
        nome: formData.get('nome') as string,
        telefone: formData.get('telefone') as string,
        profissao: formData.get('profissao') as string,
        bairro: formData.get('bairro') as string,
        experiencia,
        servicosSelecionados,
        transportes: meiosTransporte, // Compatibilidade
        meiosTransporte, // Manter compatibilidade
        temFotoPerfil: fotoPerfil !== null,
        numeroFotosGaleria: fotosGaleria.length,
        timestamp: new Date().toISOString()
      };

      console.log('📤 Dados completos:', dados);

      const response = await fetch('/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Cadastro enviado com sucesso:', result);
        
        // Mostrar aviso imediato
        setMostrarAviso(true);
        
        // Após 3 segundos, mostrar página de sucesso
        setTimeout(() => {
          setMostrarAviso(false);
          setCadastroRealizado(true);
        }, 3000);
      } else {
        const errorData = await response.json();
        alert('❌ Erro ao enviar cadastro: ' + (errorData.message || 'Tente novamente em alguns minutos.'));
      }
    } catch (error) {
      console.error('❌ Erro:', error);
      alert('❌ Erro de conexão. Verifique sua internet e tente novamente.');
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
            opacity: 1;
            transform: translateY(0);
            animation: fadeInUp 0.8s ease forwards;
          }
        `}</style>

        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
          <header className="bg-gradient-to-br from-blue-600 to-blue-700 py-16 px-5 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600 opacity-10 animate-pulse"></div>
            <div className="max-w-4xl mx-auto relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in-element">
                🎉 Cadastro Enviado com Sucesso!
              </h1>
              <p className="text-xl md:text-2xl mb-10 font-light fade-in-element">
                Seu cadastro foi enviado para <strong>análise</strong>. Nossa equipe entrará em contato via WhatsApp em até <strong>24 horas</strong> para ativar seu perfil.
              </p>
            </div>
          </header>

          <section className="py-20 px-5 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 fade-in-element">
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

              {/* Resumo do cadastro enviado */}
              <div className="bg-white rounded-2xl p-6 mb-8 border-2 border-blue-100 fade-in-element">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                  📝 Resumo do Seu Cadastro
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Dados Pessoais */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      👤 Dados Pessoais
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Foto de perfil:</span>
                        <span className={fotoPerfil ? 'text-green-600 font-semibold' : 'text-gray-400'}>
                          {fotoPerfil ? '✅ Enviada' : '❌ Não enviada'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Experiência:</span>
                        <span className={experiencia ? 'text-green-600 font-semibold' : 'text-gray-400'}>
                          {experiencia ? `${experiencia} anos` : 'Não informada'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transporte:</span>
                        <span className={meiosTransporte.length > 0 ? 'text-green-600 font-semibold' : 'text-gray-400'}>
                          {meiosTransporte.length > 0 ? `${meiosTransporte.length} opções` : 'Não informado'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Serviços */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      🔧 Serviços Selecionados
                    </h4>
                    {servicosSelecionados.length > 0 ? (
                      <div className="space-y-1">
                        {servicosSelecionados.map((servico, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <span className="text-green-500">✓</span>
                            <span className="text-gray-700">{servico}</span>
                          </div>
                        ))}
                        <div className="mt-2 text-xs text-blue-600 font-medium">
                          {servicosSelecionados.length} de {servicos.length} serviços selecionados
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm">Nenhum serviço selecionado</p>
                    )}
                  </div>
                </div>
                
                {/* Galeria de Fotos */}
                {fotosGaleria.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      📸 Galeria de Trabalhos ({fotosGaleria.length} fotos)
                    </h4>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {previewsGaleria.slice(0, 6).map((preview, index) => (
                        <div key={`sucesso-${index}`} className="aspect-square">
                          <img
                            src={preview}
                            alt={`Trabalho ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                          />
                        </div>
                      ))}
                      {fotosGaleria.length > 6 && (
                        <div className="aspect-square bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-xs text-center">
                            +{fotosGaleria.length - 6}<br/>mais
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Transporte detalhado */}
                {meiosTransporte.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      🚗 Meios de Transporte
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {meiosTransporte.map((transporte, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {transporte}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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
           opacity: 1;
           transform: translateY(0);
           animation: fadeInUp 0.8s ease forwards;
         }
        
                 html {
           scroll-behavior: smooth;
         }
         
         @keyframes slideInUp {
           from {
             opacity: 0;
             transform: translateY(100px) scale(0.9);
           }
           to {
             opacity: 1;
             transform: translateY(0) scale(1);
           }
         }
         
         @keyframes progressLoad {
           from {
             width: 0%;
           }
           to {
             width: 100%;
           }
         }
         
         .animate-slideInUp {
           animation: slideInUp 0.5s ease-out forwards;
         }
         
         .animate-progressLoad {
           animation: progressLoad 3s ease-out forwards;
         }
      `}</style>

      {/* Botão flutuante para voltar ao topo */}
      <BotaoVoltarTopo />
      
             {/* Modal de Aviso Imediato */}
       {mostrarAviso && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeInUp">
           <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 transform animate-slideInUp">
             <div className="text-center p-8">
               <div className="text-6xl mb-4 animate-bounce">🎉</div>
               <h2 className="text-2xl font-bold text-green-600 mb-4">
                 Cadastro Enviado!
               </h2>
               <p className="text-gray-700 mb-4">
                 Seu cadastro foi <strong>enviado com sucesso</strong> para nossa equipe!
               </p>
               <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg mb-4">
                 <p className="text-green-700 font-semibold text-sm">
                   📞 <strong>Entraremos em contato via WhatsApp em até 24 horas</strong>
                 </p>
               </div>
               
               {/* Resumo rápido */}
               <div className="bg-blue-50 rounded-lg p-3 mb-4 text-left">
                 <h4 className="font-semibold text-blue-800 text-sm mb-2">📋 Resumo enviado:</h4>
                 <div className="text-xs text-blue-700 space-y-1">
                   <div className="flex justify-between">
                     <span>Foto de perfil:</span>
                     <span>{fotoPerfil ? '✅' : '❌'}</span>
                   </div>
                   <div className="flex justify-between">
                     <span>Serviços:</span>
                     <span>{servicosSelecionados.length}/{servicos.length}</span>
                   </div>
                   <div className="flex justify-between">
                     <span>Fotos de trabalhos:</span>
                     <span>{fotosGaleria.length} fotos</span>
                   </div>
                 </div>
               </div>
               
               {/* Barra de progresso */}
               <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                 <div className="bg-green-500 h-2 rounded-full animate-progressLoad" style={{width: '0%'}}></div>
               </div>
               <p className="text-xs text-gray-500">
                 Redirecionando para página de confirmação...
               </p>
             </div>
           </div>
         </div>
       )}
      
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
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600"
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">WhatsApp *</label>
                  <input
                    type="tel"
                    name="telefone"
                    required
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600"
                    placeholder="(69) 99999-9999"
                  />
                </div>
                
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Profissão Principal *</label>
                  <input
                    type="text"
                    name="profissao"
                    required
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600"
                    placeholder="Ex: Pedreiro, Pintor, Eletricista..."
                  />
                </div>
                
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Bairro *</label>
                  <input
                    type="text"
                    name="bairro"
                    required
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600"
                    placeholder="Seu bairro em Porto Velho"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block font-semibold mb-2 text-gray-700">Anos de Experiência</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={experiencia}
                    onChange={(e) => setExperiencia(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600"
                    placeholder="Quantos anos de experiência você tem?"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Esta informação ajuda os clientes a conhecer seu nível de experiência
                  </p>
                </div>
              </div>
            </div>

            {/* Foto de Perfil */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 fade-in-element">
              <h2 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-3">
                📷 Foto de Perfil
              </h2>
              <p className="text-gray-600 mb-6">
                Adicione uma foto sua para que os clientes conheçam o profissional por trás do serviço:
              </p>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Preview da foto */}
                <div className="flex-shrink-0">
                  {previewFotoPerfil ? (
                    <div className="relative">
                      <img
                        src={previewFotoPerfil}
                        alt="Preview foto de perfil"
                        className="w-32 h-32 object-cover rounded-full border-4 border-blue-200 shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={removerFotoPerfil}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full border-4 border-blue-200 flex items-center justify-center shadow-lg">
                      <FaUser className="text-4xl text-blue-500" />
                    </div>
                  )}
                </div>
                
                {/* Upload */}
                <div className="flex-1">
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      id="fotoPerfil"
                      accept="image/*"
                      onChange={handleFotoPerfilChange}
                      className="hidden"
                    />
                    <label htmlFor="fotoPerfil" className="cursor-pointer block">
                      <FaCamera className="mx-auto text-3xl text-gray-400 mb-3" />
                      <p className="text-lg font-medium text-gray-600 mb-2">
                        {fotoPerfil ? 'Alterar foto de perfil' : 'Clique para adicionar sua foto'}
                      </p>
                      <p className="text-sm text-gray-500">
                        Formatos aceitos: JPG, PNG (máx. 5MB)
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Serviços */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 fade-in-element">
              <h2 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-3">
                🔧 Seus Serviços
              </h2>
              <p className="text-gray-600 mb-6">
                Selecione os serviços que você oferece. Os clientes avaliarão a qualidade do seu trabalho:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {servicos.map((servico) => (
                  <label key={servico.nome} className="cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={servicosSelecionados.includes(servico.nome)}
                      onChange={() => handleServicoChange(servico.nome)}
                    />
                    <div className={`border-2 rounded-2xl p-6 transition-all duration-200 ${
                      servicosSelecionados.includes(servico.nome)
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg transform scale-105'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md hover:scale-105'
                    }`}>
                      <div className="flex items-center gap-3">
                        <span className={`text-2xl ${
                          servicosSelecionados.includes(servico.nome) ? 'text-white' : 'text-blue-600'
                        }`}>
                          {servico.icon}
                        </span>
                        <h3 className="text-lg font-semibold">{servico.nome}</h3>
                        {servicosSelecionados.includes(servico.nome) && (
                          <span className="ml-auto text-white">✓</span>
                        )}
                      </div>
                    </div>
                  </label>
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

            {/* Galeria de Serviços */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 fade-in-element">
              <h2 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-3">
                🖼️ Galeria de Trabalhos
              </h2>
              <p className="text-gray-600 mb-6">
                Mostre seus melhores trabalhos! Quanto mais fotos, maior a confiança dos clientes:
              </p>
              
              {/* Upload de fotos */}
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors mb-6">
                <input
                  type="file"
                  id="fotosGaleria"
                  multiple
                  accept="image/*"
                  onChange={handleGaleriaChange}
                  className="hidden"
                />
                <label htmlFor="fotosGaleria" className="cursor-pointer block">
                  <FaUpload className="mx-auto text-4xl text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-600 mb-2">
                    Clique para adicionar fotos dos seus trabalhos
                  </p>
                  <p className="text-sm text-gray-500">
                    {fotosGaleria.length} foto(s) adicionada(s) • Formatos: JPG, PNG
                  </p>
                </label>
              </div>
              
              {/* Preview das fotos */}
              {previewsGaleria.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {previewsGaleria.map((preview, index) => (
                    <div key={`galeria-${index}`} className="relative group">
                      <div className="w-full h-32 bg-gray-100 rounded-xl border-2 border-gray-200 shadow-md overflow-hidden relative">
                        {/* Indicador de carregamento - fica atrás da imagem */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        </div>
                        
                        <img
                          src={preview}
                          alt={`Trabalho ${index + 1}`}
                          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 relative z-10"
                          onLoad={(e) => {
                            const img = e.target as HTMLImageElement;
                            const spinner = img.parentElement?.querySelector('.animate-spin')?.parentElement;
                            if (spinner) {
                              (spinner as HTMLElement).style.display = 'none';
                            }
                          }}
                          onError={(e) => {
                            console.error('Erro ao carregar imagem:', preview);
                            const img = e.target as HTMLImageElement;
                            const container = img.parentElement;
                            if (container) {
                              container.innerHTML = `
                                <div class="flex items-center justify-center h-full text-red-500">
                                  <span>❌ Erro ao carregar</span>
                                </div>
                              `;
                            }
                          }}
                        />
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => removerFotoGaleria(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg opacity-0 group-hover:opacity-100 z-20"
                        title="Remover foto"
                      >
                        <FaTimes size={10} />
                      </button>
                      
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-xl flex items-center justify-center pointer-events-none z-10">
                        <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Remover
                        </span>
                      </div>
                    </div>
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
                Após o envio, analisaremos suas informações e entraremos em contato via WhatsApp
              </p>
              
              {/* Resumo do cadastro */}
              <div className="mt-6 p-4 bg-blue-50 rounded-2xl text-left max-w-md mx-auto">
                <h3 className="font-bold text-blue-800 mb-2 text-center">📋 Resumo do seu cadastro:</h3>
                <div className="space-y-1 text-sm text-blue-700">
                  <div className="flex justify-between">
                    <span>Foto de perfil:</span>
                    <span>{fotoPerfil ? '✅' : '❌'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Experiência informada:</span>
                    <span>{experiencia ? '✅' : '❌'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Serviços selecionados:</span>
                    <span>{servicosSelecionados.length}/{servicos.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transporte:</span>
                    <span>{meiosTransporte.length > 0 ? '✅' : '❌'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fotos de trabalhos:</span>
                    <span>{fotosGaleria.length} foto(s)</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </>
  );
} 