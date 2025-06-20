import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    }

    const filePath = join(process.cwd(), 'data', 'cadastros.json');
    const data = JSON.parse(readFileSync(filePath, 'utf8'));
    
    const index = data.findIndex((item: any) => item.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Profissional não encontrado' }, { status: 404 });
    }

    // Tornar invisível no site
    data[index].visivelNoSite = false;
    
    writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ message: 'Profissional tornou-se invisível no site' });
  } catch (error) {
    console.error('Erro ao tornar profissional invisível:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 