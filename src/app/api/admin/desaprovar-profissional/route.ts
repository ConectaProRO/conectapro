import { NextResponse } from 'next/server';
import { obterCadastros, Cadastro } from '@/lib/data';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    }

    const cadastros = obterCadastros();
    const profissional = cadastros.find((c: Cadastro) => c.id === id);
    
    if (!profissional) {
      return NextResponse.json({ error: 'Profissional não encontrado' }, { status: 404 });
    }

    // Muda o status para rejeitado
    profissional.status = 'rejeitado';
    
    // Salvar diretamente no arquivo
    const dataPath = path.join(process.cwd(), 'data', 'cadastros.json');
    fs.writeFileSync(dataPath, JSON.stringify(cadastros, null, 2));
    
    console.log(`✅ Profissional ${profissional.nome} (${id}) desaprovado com sucesso`);
    return NextResponse.json({ message: 'Profissional desaprovado com sucesso' });
    
  } catch (error) {
    console.error('❌ Erro ao desaprovar profissional:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 