import { NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database-service';

const databaseService = new DatabaseService();

export async function GET() {
  try {
    const stats = await databaseService.getConversationStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
} 