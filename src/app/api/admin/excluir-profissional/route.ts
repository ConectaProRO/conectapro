import { NextResponse } from 'next/server';
import { obterCadastros, Cadastro } from '@/lib/data';
import fs from 'fs';
import path from 'path';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    }

    const cadastros = obterCadastros();
    const cadastroIndex = cadastros.findIndex((c: Cadastro) => c.id === id);
    
    if (cadastroIndex === -1) {
      return NextResponse.json({ error: 'Profissional não encontrado' }, { status: 404 });
    }

    // Remove o cadastro do array
    cadastros.splice(cadastroIndex, 1);
    
    // Salvar diretamente no arquivo
    const dataPath = path.join(process.cwd(), 'data', 'cadastros.json');
    fs.writeFileSync(dataPath, JSON.stringify(cadastros, null, 2));
    
    console.log(`✅ Profissional ${id} excluído com sucesso`);
    return NextResponse.json({ message: 'Profissional excluído com sucesso' });
    
  } catch (error) {
    console.error('❌ Erro ao excluir profissional:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 