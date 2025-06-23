import { NextRequest, NextResponse } from 'next/server';
import { scrapeOLX } from '@/lib/scraper';

export async function GET(request: NextRequest) {
  console.log('API route /api/scrape called');
  
  // For simplicity, we'll start with a single search term.
  const searchTerm = 'pedreiro';

  try {
    const jobListings = await scrapeOLX(searchTerm);

    if (jobListings.length === 0) {
      return NextResponse.json({ message: 'No new job listings found.' }, { status: 200 });
    }

    console.log(`✅ Successfully scraped ${jobListings.length} job listings.`);
    return NextResponse.json({
      message: `Successfully scraped ${jobListings.length} job listings.`,
      data: jobListings,
    });

  } catch (error) {
    console.error('❌ Error in /api/scrape:', error);
    return NextResponse.json({ error: 'Failed to scrape data.' }, { status: 500 });
  }
} 