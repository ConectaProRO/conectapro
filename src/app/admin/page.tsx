"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Estatisticas {
  pendentes: number;
  aprovados: number;
  pendentes_whatsapp: number;
  pendentes_site: number;
  cadastros_hoje: number;
  avaliacoes_pendentes: number;
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🛡️ Admin ConectaPro</h1>
          <p className="text-xl text-gray-600">Painel administrativo em manutenção.</p>
        </div>
      </div>
    </div>
  );
} 