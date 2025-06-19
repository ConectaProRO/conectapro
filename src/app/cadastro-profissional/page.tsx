"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaUpload, FaArrowLeft, FaPaintRoller, FaTools, FaCogs, FaBrush, FaHardHat, FaWrench, FaCubes, FaThLarge } from "react-icons/fa";

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

export default function CadastroProfissional() {
  const [nivelServicos, setNivelServicos] = useState<{ [key: string]: string }>({});
  const [meiosTransporte, setMeiosTransporte] = useState<string[]>([]);
  const [fotos, setFotos] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Progresso simples: 1/3 dados, 2/3 serviços, 3/3 fotos
  const progresso = Math.round(
    (Object.keys(nivelServicos).length / servicos.length) * 50 +
    (fotos.length > 0 ? 25 : 0) +
    (meiosTransporte.length > 0 ? 25 : 0)
  );

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl flex items-center mb-4 mt-8">
        <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-black font-semibold text-lg px-4 py-2 rounded-full bg-white shadow border border-gray-200 transition-all">
          <FaArrowLeft /> Voltar
        </Link>
      </div>
      {/* Barra de progresso */}
      <div className="w-full max-w-2xl mb-8">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-2 bg-black transition-all duration-500 rounded-full" style={{ width: `${progresso}%` }} />
        </div>
        <div className="text-right text-xs text-gray-400 mt-1">Progresso: {progresso}%</div>
      </div>
      <div className="rounded-3xl shadow-lg p-8 w-full max-w-2xl border border-gray-100 mb-10 bg-white">
        <h1 className="text-4xl font-extrabold mb-10 text-left text-black leading-tight">Cadastre-se como Profissional</h1>
        <form className="flex flex-col gap-8">
          {/* Dados pessoais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Nome completo"
              className="border-none rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-black bg-gray-100 text-lg shadow-sm"
              required
            />
            <input
              type="tel"
              placeholder="Telefone/WhatsApp"
              className="border-none rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-black bg-gray-100 text-lg shadow-sm"
              required
            />
            <input
              type="text"
              placeholder="Profissão"
              className="border-none rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-black bg-gray-100 text-lg shadow-sm"
              required
            />
            <input
              type="text"
              placeholder="Bairro onde mora"
              className="border-none rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-black bg-gray-100 text-lg shadow-sm"
              required
            />
          </div>

          {/* Upload de fotos */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700 flex items-center gap-2 text-lg"><FaUpload /> Fotos dos seus serviços</label>
            <label className="flex items-center gap-3 cursor-pointer w-fit px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-2xl border border-gray-200 text-gray-700 font-medium shadow-sm">
              <FaUpload /> Anexar fotos
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFotosChange}
                className="hidden"
              />
            </label>
            {previewUrls.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {previewUrls.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Foto ${idx + 1}`}
                    className="w-24 h-24 object-cover rounded-xl border border-gray-200 shadow"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Meio de transporte */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-black flex items-center gap-2"><FaTools /> Meio de transporte</h2>
            <div className="flex flex-wrap gap-3">
              {transportes.map((transporte) => (
                <label key={transporte} className="flex items-center gap-2 cursor-pointer bg-gray-100 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 shadow-sm">
                  <input
                    type="checkbox"
                    checked={meiosTransporte.includes(transporte)}
                    onChange={() => handleTransporteChange(transporte)}
                    className="accent-black w-5 h-5"
                  />
                  <span className="text-base">{transporte}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-black flex items-center gap-2"><FaHardHat /> Seu nível em cada serviço</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {servicos.map((servico) => (
                <div key={servico.nome} className="flex items-center rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] border border-gray-200 py-6 px-5 gap-3 transition-all duration-200 hover:shadow-[0_16px_48px_rgba(0,0,0,0.45)] hover:-translate-y-2">
                  <span className="font-bold text-gray-700 text-2xl w-10 flex-shrink-0 flex items-center justify-center">{servico.icon}</span>
                  <span className="font-semibold text-gray-800 flex-1 text-lg">{servico.nome}</span>
                  <div className="flex flex-1 gap-1 justify-end flex-wrap">
                    {niveis.map((nivel) => (
                      <button
                        type="button"
                        key={nivel.label}
                        onClick={() => handleNivelClick(servico.nome, nivel.label)}
                        className={`px-2 py-1 rounded-lg border text-base flex flex-col items-center transition-all duration-200 shadow-sm
                          ${nivelServicos[servico.nome] === nivel.label ? `${nivel.cor} border-2 border-black scale-110` : "bg-white text-gray-700 border-gray-200 hover:bg-gray-200"}`}
                        style={{ minWidth: 48 }}
                      >
                        <span className="text-lg">{nivel.emoji}</span>
                        <span className="text-[10px] font-semibold mt-0.5 leading-tight">{nivel.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-black text-white rounded-full px-8 py-4 font-bold text-xl hover:bg-gray-900 transition-all mt-8 shadow-lg"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
} 