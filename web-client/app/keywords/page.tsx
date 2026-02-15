'use client';

import Container from '@/components/container/Container';
import { apiRoutes } from '@/constants/apiRoutes';
import { appRoutes } from '@/constants/appRoutes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Keyword {
  _id: string;
  term: string;
  definition: string;
}

export default function KeywordsPage() {
  const router = useRouter();
  const [keywords, setKeywords] = useState<Keyword[]>([]);

  useEffect(() => {
    fetch(apiRoutes.keywords)
      .then((res) => res.json())
      .then(setKeywords);
  }, []);

  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <Container className="space-y-6">
        <h1 className="text-3xl font-semibold">Глоссарий</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {keywords.map((keywordData) => (
            <div
              key={keywordData._id}
              className="cursor-pointer rounded-xl bg-white p-4 shadow-lg outline outline-black/5
             transition hover:shadow-xl hover:-translate-y-0.5
             dark:bg-slate-800 dark:shadow-none dark:outline-white/10"
              onClick={() => router.push(appRoutes.keywordById(keywordData._id))}
            >
              <div className="font-medium">{keywordData.term}</div>
              <div className="text-sm text-neutral-400 mt-2">{keywordData.definition}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
