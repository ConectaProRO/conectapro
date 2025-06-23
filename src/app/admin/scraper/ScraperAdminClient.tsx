'use client';

import { useState } from 'react';
import { JobListing } from '@/lib/scraper-service';

interface ScraperAdminClientProps {
  initialJobs: JobListing[];
}

export default function ScraperAdminClient({ initialJobs }: ScraperAdminClientProps) {
  const [jobs, setJobs] = useState<JobListing[]>(initialJobs);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleScrape = async () => {
    setIsLoading(true);
    setMessage('Iniciando raspagem... Isso pode levar um minuto.');

    try {
      const response = await fetch('/api/scrape-olx');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Falha ao iniciar a raspagem.');
      }
      
      setMessage(result.message || 'Raspagem concluída com sucesso!');
      // Refresh the list of jobs after scraping
      const refreshResponse = await fetch('/api/get-jobs'); // We need to create this endpoint
      const refreshedJobs = await refreshResponse.json();
      setJobs(refreshedJobs);

    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : 'Ocorreu um erro desconhecido.';
      setMessage(`Erro: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleScrape}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
      >
        {isLoading ? 'Raspando...' : 'Iniciar Raspagem de Vagas'}
      </button>

      {message && (
        <div className={`mt-4 p-4 rounded ${message.startsWith('Erro:') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Vagas Coletadas Recentemente</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="w-full bg-gray-100 text-left">
                <th className="py-2 px-4 border-b">Título</th>
                <th className="py-2 px-4 border-b">Preço</th>
                <th className="py-2 px-4 border-b">Localização</th>
                <th className="py-2 px-4 border-b">Link</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.url} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{job.title}</td>
                  <td className="py-2 px-4 border-b">{job.price || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{job.location || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">
                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      Ver Anúncio
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 