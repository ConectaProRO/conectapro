import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const CADASTROS_FILE = path.join(DATA_DIR, 'cadastros.json');

export async function POST(request: NextRequest) {
  try {
    console.log('📨 Recebendo lote adicional de fotos...');
    
    const dados = await request.json();
    const { cadastroId, fotos, batchNumber } = dados;
    
    if (!cadastroId || !fotos || !Array.isArray(fotos)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Dados inválidos para lote de fotos' 
      }, { status: 400 });
    }
    
    console.log(`📋 Lote ${batchNumber}: ${fotos.length} fotos para cadastro ${cadastroId}`);
    
    // Ler cadastros existentes
    let cadastros = [];
    if (fs.existsSync(CADASTROS_FILE)) {
      const data = fs.readFileSync(CADASTROS_FILE, 'utf-8');
      cadastros = JSON.parse(data);
    }
    
    // Encontrar o cadastro
    const cadastroIndex = cadastros.findIndex((c: { id: string }) => c.id === cadastroId);
    if (cadastroIndex === -1) {
      return NextResponse.json({ 
        success: false, 
        message: 'Cadastro não encontrado' 
      }, { status: 404 });
    }
    
    // Adicionar fotos ao cadastro existente
    if (!cadastros[cadastroIndex].fotos) {
      cadastros[cadastroIndex].fotos = [];
    }
    
    cadastros[cadastroIndex].fotos.push(...fotos);
    cadastros[cadastroIndex].numeroFotosGaleria = cadastros[cadastroIndex].fotos.length;
    
    // Salvar de volta
    fs.writeFileSync(CADASTROS_FILE, JSON.stringify(cadastros, null, 2));
    
    console.log(`✅ Lote ${batchNumber} adicionado com sucesso. Total de fotos: ${cadastros[cadastroIndex].fotos.length}`);
    
    return NextResponse.json({ 
      success: true, 
      message: `Lote ${batchNumber} adicionado com sucesso`,
      totalFotos: cadastros[cadastroIndex].fotos.length
    });

  } catch (error) {
    console.error('❌ Erro ao adicionar lote de fotos:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    }, { status: 500 });
  }
} 