import { NextRequest, NextResponse } from 'next/server';
import { rejeitarAvaliacao } from '@/lib/data';

export async function POST(request: NextRequest) {
  try {
    const { id, resposta } = await request.json();
    
    const sucesso = rejeitarAvaliacao(id, resposta);
    
    if (sucesso) {
      return NextResponse.json({ success: true, message: 'Avaliação rejeitada.' });
    } else {
      return NextResponse.json({ success: false, message: 'Avaliação não encontrada' }, { status: 404 });
    }
  } catch (error) {
    console.error('Erro ao rejeitar avaliação:', error);
    return NextResponse.json({ success: false, message: 'Erro interno do servidor' }, { status: 500 });
  }
} 