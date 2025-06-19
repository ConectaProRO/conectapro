import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const CADASTROS_FILE = path.join(process.cwd(), 'data', 'cadastros.json');

// Garantir que o diretório existe
async function ensureDataDir() {
  const dataDir = path.dirname(CADASTROS_FILE);
  if (!existsSync(dataDir)) {
    await writeFile(path.join(dataDir, '.gitkeep'), '');
  }
}

async function readCadastros() {
  try {
    if (!existsSync(CADASTROS_FILE)) {
      return [];
    }
    const data = await readFile(CADASTROS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveCadastros(cadastros: unknown[]) {
  await ensureDataDir();
  await writeFile(CADASTROS_FILE, JSON.stringify(cadastros, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const dados = await request.json();
    
    // Adicionar timestamp e ID único
    const novoCadastro = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'pendente',
      ...dados
    };

    // Ler cadastros existentes
    const cadastros = await readCadastros();
    
    // Adicionar novo cadastro
    cadastros.push(novoCadastro);
    
    // Salvar
    await saveCadastros(cadastros);

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