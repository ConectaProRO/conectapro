import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const CADASTROS_FILE = path.join(process.cwd(), 'data', 'cadastros.json');

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

export async function GET() {
  try {
    const cadastros = await readCadastros();
    
    // Ordenar por data mais recente primeiro
    cadastros.sort((a: { timestamp: string }, b: { timestamp: string }) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    return NextResponse.json(cadastros);
  } catch (error) {
    console.error('Erro ao ler cadastros:', error);
    return NextResponse.json([], { status: 500 });
  }
} 