"use client";
import Image from "next/image";

export default function Sobre() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-10 px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <Image src="/conectapro.png" alt="Logo ConectaPro" width={120} height={120} className="mb-2" />
          <div className="text-blue-700 font-semibold text-lg text-center">Conectando profissionais a novas oportunidades</div>
        </div>
        <h1 className="text-3xl font-extrabold text-center text-black mb-6">O que é a ConectaPro?</h1>
        <p className="text-gray-700 text-lg mb-6 text-center">A <strong>ConectaPro</strong> é uma plataforma gratuita que conecta profissionais da construção civil a clientes que precisam de serviços. Nosso objetivo é facilitar o encontro entre quem precisa trabalhar e quem precisa contratar, de forma simples, rápida e segura.</p>

        <h2 className="text-xl font-bold text-blue-900 mt-8 mb-2">Como funciona?</h2>
        <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-1">
          <li><strong>Cadastro fácil:</strong> O profissional se cadastra (com ajuda, se precisar) e informa seus serviços, bairro e telefone/WhatsApp.</li>
          <li><strong>Portfólio:</strong> Pode enviar fotos dos seus trabalhos para mostrar aos clientes.</li>
          <li><strong>Visibilidade:</strong> Seu perfil aparece no mapa e na lista de profissionais, facilitando ser encontrado por quem precisa.</li>
          <li><strong>Contato direto:</strong> O cliente entra em contato direto com o profissional, sem intermediários.</li>
        </ol>

        <h2 className="text-xl font-bold text-blue-900 mt-8 mb-2">Por que usar a ConectaPro?</h2>
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <div className="bg-blue-50 rounded-lg px-4 py-3 text-blue-900 font-medium shadow">Mais oportunidades de trabalho</div>
          <div className="bg-blue-50 rounded-lg px-4 py-3 text-blue-900 font-medium shadow">Divulgação gratuita</div>
          <div className="bg-blue-50 rounded-lg px-4 py-3 text-blue-900 font-medium shadow">Contato direto com clientes</div>
          <div className="bg-blue-50 rounded-lg px-4 py-3 text-blue-900 font-medium shadow">Apoio para o cadastro</div>
          <div className="bg-blue-50 rounded-lg px-4 py-3 text-blue-900 font-medium shadow">Plataforma simples, feita para todos</div>
        </div>

        <h2 className="text-xl font-bold text-blue-900 mt-8 mb-2">Como se cadastrar?</h2>
        <div className="bg-gray-100 rounded-lg px-4 py-4 text-gray-800 text-center mb-6">
          Entre em contato pelo WhatsApp: <strong>(69) xxxxx-xxxx</strong><br/>
          Ou acesse: <strong>www.conectapro.app</strong><br/>
          Se preferir, ligue para nossa equipe e ajudamos você a se cadastrar!
        </div>

        <h2 className="text-xl font-bold text-blue-900 mt-8 mb-2">Quem faz a ConectaPro?</h2>
        <p className="text-gray-700 text-lg mb-4 text-center">Somos uma equipe comprometida em ajudar profissionais a conseguirem mais trabalho e clientes a encontrarem bons serviços.<br/>
        Nosso compromisso é com a inclusão, a simplicidade e o resultado.</p>

        <div className="flex flex-col items-center mt-8 border-t pt-4">
          <Image src="/conectapro.png" alt="Logo pequena" width={40} height={40} className="mb-2" />
          <div className="text-blue-700 font-semibold">ConectaPro — Juntos, construindo oportunidades.</div>
        </div>
      </div>
    </div>
  );
} 