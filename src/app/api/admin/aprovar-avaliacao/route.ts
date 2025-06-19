import { NextRequest, NextResponse } from 'next/server';
import { aprovarAvaliacao } from '@/lib/data';

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    
    const sucesso = aprovarAvaliacao(id);
    
    if (sucesso) {
      return NextResponse.json({ success: true, message: 'Avaliação aprovada com sucesso!' });
    } else {
      return NextResponse.json({ success: false, message: 'Avaliação não encontrada' }, { status: 404 });
    }
  } catch (error) {
    console.error('Erro ao aprovar avaliação:', error);
    return NextResponse.json({ success: false, message: 'Erro interno do servidor' }, { status: 500 });
  }
} 