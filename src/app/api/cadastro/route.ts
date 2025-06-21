import { NextRequest, NextResponse } from 'next/server';
import { adicionarCadastro } from '@/lib/data';

// Configuração para aceitar requisições maiores
export const runtime = 'nodejs';
export const maxDuration = 30; // 30 segundos timeout

export async function POST(request: NextRequest) {
  try {
    console.log('📨 Recebendo cadastro...');
    
    // Verificar Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json({ 
        success: false, 
        message: 'Content-Type deve ser application/json' 
      }, { status: 400 });
    }

    // Ler dados com timeout
    const dados = await Promise.race([
      request.json(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout ao ler dados')), 25000)
      )
    ]);
    
    console.log('📋 Dados recebidos:', {
      nome: dados.nome,
      telefone: dados.telefone,
      profissao: dados.profissao,
      bairro: dados.bairro,
      temFotoPerfil: !!dados.fotoPerfil,
      numeroFotos: dados.fotos?.length || 0,
      tamanhoFotoPerfil: dados.fotoPerfil ? (dados.fotoPerfil.length / 1024).toFixed(1) + 'KB' : 'N/A',
      tamanhoFotos: dados.fotos ? (dados.fotos.join('').length / 1024).toFixed(1) + 'KB' : 'N/A'
    });
    
    // Usar o módulo compartilhado para adicionar o cadastro
    const novoCadastro = adicionarCadastro(dados);
    
    console.log('✅ Cadastro salvo com sucesso:', novoCadastro.id);

    return NextResponse.json({ 
      success: true, 
      message: 'Cadastro recebido com sucesso!',
      id: novoCadastro.id
    });

  } catch (error) {
    console.error('❌ Erro ao processar cadastro:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('Timeout')) {
        return NextResponse.json({ 
          success: false, 
          message: 'Timeout - as imagens são muito grandes. Tente com imagens menores.' 
        }, { status: 408 });
      }
      
      if (error.message.includes('JSON')) {
        return NextResponse.json({ 
          success: false, 
          message: 'Dados inválidos - verifique as imagens enviadas.' 
        }, { status: 400 });
      }
    }
    
    return NextResponse.json({ 
      success: false, 
      message: 'Erro interno do servidor. Tente novamente.' 
    }, { status: 500 });
  }
} 