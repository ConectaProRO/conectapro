import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// Apply the stealth plugin to avoid bot detection
puppeteer.use(StealthPlugin());

const TARGET_URL = 'https://www.olx.com.br/estado-ro';

export interface JobListing {
  title: string;
  price?: string;
  location?: string;
  url: string;
  date?: string;
}

export async function scrapeOLX(searchTerm: string): Promise<JobListing[]> {
  console.log(`🚀 Starting scraping for term: "${searchTerm}"...`);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Navigate to the OLX page for the state of Rondônia with the search term
    const searchUrl = `${TARGET_URL}?q=${encodeURIComponent(searchTerm)}`;
    console.log(`Navigating to ${searchUrl}`);
    await page.goto(searchUrl, { waitUntil: 'networkidle2' });

    // Wait for the ad list to be loaded
    await page.waitForSelector('#ad-list');

    const jobListings = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('#ad-list li a'));
      const jobs: JobListing[] = [];

      items.forEach(item => {
        const titleElement = item.querySelector('h2');
        const priceElement = item.querySelector('[data-testid="ad-price"]');
        
        // Extract location and date, which are in the same container
        const infoContainer = item.querySelector('div:not([class]) > div > span[color="dark-low"]');
        const location = infoContainer?.textContent || 'N/A';
        const date = 'N/A'; // Date needs more specific extraction logic, perhaps from tooltip or details page

        const title = titleElement?.textContent?.trim() || 'No title';
        const url = item.getAttribute('href') || '#';
        const price = priceElement?.textContent?.trim();

        jobs.push({ title, price, location, url, date });
      });

      return jobs;
    });

    console.log(`✅ Found ${jobListings.length} job listings.`);
    return jobListings;

  } catch (error) {
    console.error('❌ An error occurred during scraping:', error);
    // In case of error, take a screenshot for debugging
    await page.screenshot({ path: 'error_screenshot.png' });
    return [];
  } finally {
    await browser.close();
    console.log('🚪 Browser closed.');
  }
} 