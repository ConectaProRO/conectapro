import { NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database-service';

const databaseService = new DatabaseService();

export async function GET() {
  try {
    const conversations = await databaseService.getActiveConversations();
    return NextResponse.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversations' },
      { status: 500 }
    );
  }
} 