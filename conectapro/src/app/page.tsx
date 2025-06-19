"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FaUserTie, FaSearch } from "react-icons/fa";

const MapWithMarkers = dynamic(() => import("./components/MapWithMarkers"), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col items-center">
      {/* Espaço para header */}
      <div className="h-20" />
      {/* Cards de ação */}
      <div className="flex gap-8 flex-wrap justify-center mt-10 mb-8 w-full max-w-4xl">
        <Card 
          title="Sou Profissional" 
          description="Cadastre-se e encontre serviços próximos." 
          link="/cadastro-profissional"
          icon={<FaUserTie size={32} />}
        />
        <Card 
          title="Preciso de um Profissional" 
          description="Busque profissionais qualificados para sua necessidade." 
          link="/buscar-profissional"
          icon={<FaSearch size={32} />}
        />
      </div>
      {/* Mapa */}
      <div className="w-full max-w-3xl mt-4 mb-10 rounded-3xl overflow-hidden shadow-lg border border-gray-200">
        <MapWithMarkers />
      </div>
    </div>
  );
}

function Card({ title, description, link, icon }: { title: string; description: string; link: string; icon: React.ReactNode }) {
  return (
    <Link href={link} className="flex-1 min-w-[260px] max-w-[350px] h-52 bg-white rounded-3xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all p-8 flex flex-col justify-between items-start border border-gray-100 group">
      <div className="flex items-center gap-3 mb-2 text-blue-600 group-hover:text-blue-800 transition-colors">{icon}<h2 className="text-2xl font-semibold">{title}</h2></div>
      <p className="text-gray-500 text-base font-medium flex-1">{description}</p>
      <span className="self-end text-blue-700 font-bold text-lg group-hover:underline">Acessar →</span>
    </Link>
  );
}
