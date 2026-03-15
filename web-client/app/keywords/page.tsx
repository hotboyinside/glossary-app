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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiRoutes.keywords)
      .then((res) => res.json())
      .then((json) => setKeywords(json.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-12 bg-white dark:bg-gray-800 min-h-dvh">
      <Container className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Глоссарий</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Термины и определения предметной области
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-gray-100 dark:bg-slate-700 p-4 h-28 animate-pulse"
                />
              ))
            : keywords.map((keywordData) => (
                <div
                  key={keywordData._id}
                  className="cursor-pointer rounded-xl bg-white p-4 shadow-lg outline outline-black/5
                 transition hover:shadow-xl hover:-translate-y-0.5
                 dark:bg-slate-800 dark:shadow-none dark:outline-white/10"
                  onClick={() => router.push(appRoutes.keywordById(keywordData._id))}
                >
                  <div className="font-medium">{keywordData.term}</div>
                  <div className="text-sm text-neutral-400 mt-2 line-clamp-3 break-words">
                    {keywordData.definition}
                  </div>
                </div>
              ))}
        </div>
      </Container>
    </section>
  );
}
