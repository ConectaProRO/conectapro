import { NextResponse } from 'next/server';
import { obterProfissionaisAprovados } from '@/lib/data';

export async function GET() {
  try {
    const profissionais = obterProfissionaisAprovados();
    return NextResponse.json(profissionais);
  } catch (error) {
    console.error('Erro ao obter profissionais:', error);
    return NextResponse.json([], { status: 500 });
  }
} 