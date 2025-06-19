import { NextRequest, NextResponse } from 'next/server';
import { adicionarAvaliacao, obterAvaliacoesAprovadas } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profissionalId = searchParams.get('profissionalId');
    
    const avaliacoes = obterAvaliacoesAprovadas(profissionalId || undefined);
    return NextResponse.json(avaliacoes);
  } catch (error) {
    console.error('Erro ao obter avaliações:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const dados = await request.json();
    
    const novaAvaliacao = adicionarAvaliacao(dados);
    
    console.log('Nova avaliação salva:', novaAvaliacao);

    return NextResponse.json({ 
      success: true, 
      message: 'Avaliação recebida! Será analisada antes da publicação.',
      id: novaAvaliacao.id
    });

  } catch (error) {
    console.error('Erro ao salvar avaliação:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    }, { status: 500 });
  }
} 