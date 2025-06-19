"use client";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";

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

// Coordenadas aproximadas de bairros de Porto Velho, RO
const coordenadasBairros: Record<string, LatLngExpression[]> = {
  "Centro": [[-8.76116, -63.90043], [-8.762, -63.902], [-8.760, -63.901]],
  "Liberdade": [[-8.755, -63.895], [-8.757, -63.897], [-8.753, -63.893]],
  "Olaria": [[-8.770, -63.910], [-8.772, -63.912], [-8.768, -63.908]],
  "São João Bosco": [[-8.765, -63.920], [-8.767, -63.922], [-8.763, -63.918]],
  "Caiari": [[-8.780, -63.930], [-8.782, -63.932], [-8.778, -63.928]],
  "Eldorado": [[-8.745, -63.885], [-8.747, -63.887], [-8.743, -63.883]],
  "Flodoaldo Pontes Pinto": [[-8.725, -63.870], [-8.727, -63.872], [-8.723, -63.868]],
  "Tancredo Neves": [[-8.790, -63.940], [-8.792, -63.942], [-8.788, -63.938]],
  "Nova Esperança": [[-8.800, -63.950], [-8.802, -63.952], [-8.798, -63.948]],
  "Cidade Jardim": [[-8.735, -63.875], [-8.737, -63.877], [-8.733, -63.873]],
  "Areal": [[-8.775, -63.915], [-8.777, -63.917], [-8.773, -63.913]],
  "Rio Madeira": [[-8.785, -63.925], [-8.787, -63.927], [-8.783, -63.923]],
  // Coordenada padrão para bairros não mapeados
  "default": [[-8.76116, -63.90043]]
};

function obterCoordenada(bairro: string, indice: number): LatLngExpression {
  const coordenadas = coordenadasBairros[bairro] || coordenadasBairros["default"];
  const coordenadaIndex = indice % coordenadas.length;
  return coordenadas[coordenadaIndex];
}

function obterServicoPrincipal(nivelServicos: Record<string, string>): string {
  // Busca o primeiro serviço que não seja "Não faço"
  for (const [servico, nivel] of Object.entries(nivelServicos)) {
    if (nivel !== "Não faço" && nivel) {
      return `${servico} (${nivel})`;
    }
  }
  return "Serviços diversos";
}

export default function MapWithMarkers() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Corrige os ícones padrão do leaflet
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    // Carregar profissionais aprovados
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
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ width: "100%", height: 400, borderRadius: 16, overflow: "hidden" }}>
      <MapContainer
        center={[-8.76116, -63.90043] as LatLngExpression}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {carregando && (
          <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-2 rounded-lg text-sm text-gray-600 z-[1000]">
            Carregando profissionais...
          </div>
        )}

        {!carregando && profissionais.length === 0 && (
          <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-2 rounded-lg text-sm text-gray-600 z-[1000]">
            Nenhum profissional cadastrado ainda
          </div>
        )}

        {profissionais.map((prof, idx) => (
          <CircleMarker
            key={prof.id}
            center={obterCoordenada(prof.bairro, idx)}
            radius={6}
            pathOptions={{ 
              color: '#2563eb', 
              fillColor: '#2563eb', 
              fillOpacity: 0.9,
              weight: 2
            }}
          >
            <Popup>
              <div className="text-sm">
                <b>{prof.nome}</b><br />
                <span className="text-gray-600">📍 {prof.bairro}</span><br />
                <span className="text-gray-600">🔧 {prof.profissao}</span><br />
                <span className="text-blue-600 font-medium">{obterServicoPrincipal(prof.nivelServicos)}</span>
                <div className="mt-2">
                  <a 
                    href={`https://wa.me/55${prof.telefone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800 font-medium text-xs"
                  >
                    💬 Entrar em contato
                  </a>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
} 