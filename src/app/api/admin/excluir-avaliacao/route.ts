import { NextResponse } from 'next/server';
import { obterAvaliacoes } from '@/lib/data';
import fs from 'fs';
import path from 'path';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    }

    const avaliacoes = obterAvaliacoes();
    const avaliacaoIndex = avaliacoes.findIndex(a => a.id === id);
    
    if (avaliacaoIndex === -1) {
      return NextResponse.json({ error: 'Avaliação não encontrada' }, { status: 404 });
    }

    // Remove a avaliação do array
    avaliacoes.splice(avaliacaoIndex, 1);
    
    // Salvar diretamente no arquivo
    const dataPath = path.join(process.cwd(), 'data', 'avaliacoes.json');
    fs.writeFileSync(dataPath, JSON.stringify(avaliacoes, null, 2));
    
    console.log(`✅ Avaliação ${id} excluída com sucesso`);
    return NextResponse.json({ message: 'Avaliação excluída com sucesso' });
    
  } catch (error) {
    console.error('❌ Erro ao excluir avaliação:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 