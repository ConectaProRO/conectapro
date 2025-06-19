import { NextRequest, NextResponse } from 'next/server';
import { adicionarCadastro } from '@/lib/data';

export async function POST(request: NextRequest) {
  try {
    const dados = await request.json();
    
    // Usar o módulo compartilhado para adicionar o cadastro
    const novoCadastro = adicionarCadastro(dados);
    
    console.log('Novo cadastro salvo:', novoCadastro);

    return NextResponse.json({ 
      success: true, 
      message: 'Cadastro recebido com sucesso!',
      id: novoCadastro.id
    });

  } catch (error) {
    console.error('Erro ao salvar cadastro:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    }, { status: 500 });
  }
} 