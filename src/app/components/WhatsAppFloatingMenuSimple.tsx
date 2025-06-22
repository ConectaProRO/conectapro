"use client";

import { useState } from "react";
import { FaWhatsapp, FaTimes, FaUser, FaTools, FaQuestionCircle } from "react-icons/fa";

export default function WhatsAppFloatingMenuSimple() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = "5569993705343";

  const menuOptions = [
    {
      id: "cliente",
      icon: <FaUser className="w-5 h-5" />,
      title: "Sou Cliente",
      description: "Quero contratar um profissional",
      message: "Olá! Sou cliente e gostaria de contratar um profissional através da ConectaPro."
    },
    {
      id: "profissional",
      icon: <FaTools className="w-5 h-5" />,
      title: "Sou Profissional",
      description: "Quero me cadastrar na plataforma",
      message: "Olá! Sou profissional da construção e gostaria de me cadastrar na ConectaPro para oferecer meus serviços."
    },
    {
      id: "duvidas",
      icon: <FaQuestionCircle className="w-5 h-5" />,
      title: "Tenho Dúvidas",
      description: "Preciso de ajuda ou informações",
      message: "Olá! Tenho algumas dúvidas sobre a ConectaPro e gostaria de conversar."
    }
  ];

  const createWhatsAppLink = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu de opções */}
      {isOpen && (
        <div className="mb-4 space-y-2 animate-fade-in">
          {menuOptions.map((option) => (
            <a
              key={option.id}
              href={createWhatsAppLink(option.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg shadow-lg border border-gray-200 p-4 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 max-w-xs text-decoration-none"
              onClick={() => {
                console.log("🔗 Link clicado:", option.title);
                console.log("📱 URL:", createWhatsAppLink(option.message));
                setIsOpen(false);
              }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  {option.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 text-xs mt-1 leading-relaxed">
                    {option.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
          
          {/* Opção de contato direto */}
          <a
            href={createWhatsAppLink("Olá! Entrei em contato através do site ConectaPro.")}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-green-500 text-white rounded-lg shadow-lg p-4 cursor-pointer hover:bg-green-600 transition-all duration-300 transform hover:scale-105 max-w-xs text-decoration-none"
            onClick={() => {
              console.log("🔗 Contato direto clicado");
              setIsOpen(false);
            }}
          >
            <div className="flex items-center gap-3">
              <FaWhatsapp className="w-6 h-6" />
              <div>
                <h3 className="font-semibold text-sm">Contato Direto</h3>
                <p className="text-green-100 text-xs mt-1">
                  (69) 99370-5343
                </p>
              </div>
            </div>
          </a>
        </div>
      )}

      {/* Botão principal do WhatsApp */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
          isOpen 
            ? "bg-red-500 hover:bg-red-600" 
            : "bg-green-500 hover:bg-green-600"
        }`}
        aria-label={isOpen ? "Fechar menu WhatsApp" : "Abrir menu WhatsApp"}
      >
        {isOpen ? (
          <FaTimes className="w-6 h-6 text-white" />
        ) : (
          <FaWhatsapp className="w-7 h-7 text-white" />
        )}
      </button>

      {/* Pulse animation quando fechado */}
      {!isOpen && (
        <div className="absolute inset-0 w-14 h-14 rounded-full bg-green-500 animate-ping opacity-75"></div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        a {
          text-decoration: none !important;
        }
        
        a:hover {
          text-decoration: none !important;
        }
      `}</style>
    </div>
  );
} 