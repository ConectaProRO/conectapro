import { NextRequest, NextResponse } from 'next/server';
import { aprovarProfissional } from '@/lib/data';

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    
    const sucesso = aprovarProfissional(id);
    
    if (sucesso) {
      return NextResponse.json({ success: true, message: 'Profissional aprovado com sucesso!' });
    } else {
      return NextResponse.json({ success: false, message: 'Profissional não encontrado' }, { status: 404 });
    }
  } catch (error) {
    console.error('Erro ao aprovar profissional:', error);
    return NextResponse.json({ success: false, message: 'Erro interno do servidor' }, { status: 500 });
  }
} 