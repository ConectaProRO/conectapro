import { NextRequest, NextResponse } from 'next/server';
import { calcularMediaAvaliacoes } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profissionalId = searchParams.get('profissionalId');
    
    if (!profissionalId) {
      return NextResponse.json({ media: 0, total: 0 });
    }
    
    const estatisticas = calcularMediaAvaliacoes(profissionalId);
    return NextResponse.json(estatisticas);
  } catch (error) {
    console.error('Erro ao calcular média de avaliações:', error);
    return NextResponse.json({ media: 0, total: 0 }, { status: 500 });
  }
} 