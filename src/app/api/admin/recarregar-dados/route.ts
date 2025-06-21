import { NextResponse } from 'next/server';
import { recarregarDados } from '@/lib/data';

export async function POST() {
  try {
    console.log('🔄 API: Recarregando dados do sistema...');
    
    const resultado = recarregarDados();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Dados recarregados com sucesso!',
      dados: resultado
    });

  } catch (error) {
    console.error('❌ Erro ao recarregar dados:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    }, { status: 500 });
  }
} 