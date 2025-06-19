import { NextResponse } from 'next/server';
import { obterCadastros } from '@/lib/data';

export async function GET() {
  try {
    // Usar o módulo compartilhado para obter os cadastros
    const cadastros = obterCadastros();
    return NextResponse.json(cadastros);
  } catch (error) {
    console.error('Erro ao ler cadastros:', error);
    return NextResponse.json([], { status: 500 });
  }
} 