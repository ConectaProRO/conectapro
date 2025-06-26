"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const whatsappNumber = "5569993705343";

const menuOptions = [
  {
    id: "cliente",
    icon: "👤",
    title: "Sou Cliente",
    message: "Olá! Sou cliente e gostaria de contratar um profissional através da ConectaPro."
  },
  {
    id: "profissional",
    icon: "👷",
    title: "Sou Profissional",
    message: "Olá! Sou profissional da construção e gostaria de me cadastrar na ConectaPro para oferecer meus serviços."
  },
  {
    id: "duvidas",
    icon: "❓",
    title: "Tenho Dúvidas",
    message: "Olá! Tenho algumas dúvidas sobre a ConectaPro e gostaria de conversar."
  }
];

function createWhatsAppLink(message: string) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}

export default function WhatsAppFloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Botão flutuante */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl transition-all duration-300"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Abrir menu do WhatsApp"
      >
        <FaWhatsapp className="w-9 h-9" />
      </button>

      {/* Menu suspenso */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 bg-white rounded-2xl shadow-2xl p-4 flex flex-col gap-3 animate-fadeInUp min-w-[220px]">
          <div className="font-bold text-green-700 mb-2 text-center">Fale com a ConectaPro</div>
          {menuOptions.map((opt) => (
            <a
              key={opt.id}
              href={createWhatsAppLink(opt.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-50 text-green-800 font-medium transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">{opt.icon}</span>
              <span>{opt.title}</span>
            </a>
          ))}
          <button
            className="mt-2 text-xs text-gray-400 hover:text-gray-600 w-full"
            onClick={() => setIsOpen(false)}
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
} 