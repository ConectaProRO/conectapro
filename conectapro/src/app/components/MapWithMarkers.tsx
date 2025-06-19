"use client";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { useEffect } from "react";

const profissionais: { nome: string; pos: LatLngExpression; servico: string }[] = [
  { nome: "João", pos: [-8.76116, -63.90043], servico: "Pintura" },
  { nome: "Maria", pos: [-8.758, -63.903], servico: "Alvenaria" },
  { nome: "Carlos", pos: [-8.765, -63.91], servico: "Reboco" },
];

export default function MapWithMarkers() {
  useEffect(() => {
    // Corrige os ícones padrão do leaflet
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

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
        {profissionais.map((prof, idx) => (
          <CircleMarker
            key={idx}
            center={prof.pos}
            radius={5}
            pathOptions={{ color: '#2563eb', fillColor: '#2563eb', fillOpacity: 0.9 }}
          >
            <Popup>
              <b>{prof.nome}</b><br />
              Serviço: {prof.servico}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
} 