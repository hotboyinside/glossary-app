'use client';
import Container from '@/components/container/Container';
import Graph from '@/components/keywords/Graph';
import { apiRoutes } from '@/constants/apiRoutes';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface KeywordSource {
  name?: string;
  url: string;
}

export interface KeywordData {
  keyword: {
    id: string;
    term: string;
    definition: string;
    sources?: KeywordSource[];
  };
  related: {
    id: string;
    term: string;
  }[];
}

export default function Page() {
  const { id } = useParams();
  const preparedId = id?.toString() ?? '';
  const router = useRouter();
  const [data, setData] = useState<KeywordData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiRoutes.keywordByIdWithRelated(preparedId))
      .then((res) => res.json())
      .then((json) => setData(json.data))
      .finally(() => setLoading(false));
  }, [preparedId]);

  if (loading || !data) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-12 bg-white dark:bg-gray-800 min-h-dvh">
      <Container className="space-y-6">
        <button
          onClick={() => router.push('/keywords')}
          className="cursor-pointer inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition"
        >
          ← К всем словам
        </button>

        <div className="space-y-3">
          <h1 className="text-2xl font-bold">{data.keyword.term}</h1>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
            {data.keyword.definition}
          </p>
        </div>

        {data.keyword.sources && data.keyword.sources.length > 0 && (
          <div className="space-y-1.5 border-l-2 border-indigo-200 dark:border-indigo-800 pl-4">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Источники
            </h2>
            {data.keyword.sources.map((s, idx) => (
              <div key={idx} className="text-sm">
                {s.name && <span className="text-gray-600 dark:text-gray-300">{s.name}: </span>}
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline break-all"
                >
                  {s.url}
                </a>
              </div>
            ))}
          </div>
        )}

        <div className="w-full h-[60vh] md:h-[70vh] lg:h-[75vh] border border-black/10 dark:border-white/10 rounded-xl overflow-hidden">
          <Graph
            keyword={data.keyword}
            related={data.related}
            onNodeClick={(id) => router.push(`/keywords/${id}`)}
          />
        </div>
      </Container>
    </section>
  );
}
