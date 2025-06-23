import { NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database-service';

export async function GET() {
  try {
    const databaseService = new DatabaseService();
    const jobs = await databaseService.getJobListings();
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('❌ Error in /api/get-jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch job listings.' }, { status: 500 });
  }
} 