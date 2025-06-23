import { DatabaseService } from '@/lib/database-service';
import ScraperAdminClient from './ScraperAdminClient';

export default async function ScraperAdminPage() {
  const databaseService = new DatabaseService();
  const initialJobs = await databaseService.getJobListings();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Painel de Raspagem de Dados - OLX</h1>
      <p className="mb-6 text-gray-600">
        Monitore as vagas de emprego para a construção civil em Rondônia.
      </p>
      
      <ScraperAdminClient initialJobs={initialJobs} />

    </div>
  );
} 