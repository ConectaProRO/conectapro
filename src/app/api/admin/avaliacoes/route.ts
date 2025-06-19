import { NextResponse } from 'next/server';
import { obterAvaliacoes } from '@/lib/data';

export async function GET() {
  try {
    const avaliacoes = obterAvaliacoes();
    return NextResponse.json(avaliacoes);
  } catch (error) {
    console.error('Erro ao obter avaliações:', error);
    return NextResponse.json([], { status: 500 });
  }
} 