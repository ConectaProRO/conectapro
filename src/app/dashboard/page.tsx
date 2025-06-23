'use client';
import { useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState(null);
  
  const handleScrape = async () => {
    const response = await fetch('/api/scrape');
    const result = await response.json();
    setData(result);
  };
  
  return (
    <div>
      <button onClick={handleScrape}>Iniciar Scraping</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
} 