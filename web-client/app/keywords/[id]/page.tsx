'use client'; // <- important
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
      .then((json) => setData(json))
      .finally(() => setLoading(false));
  }, [preparedId]);

  if (loading || !data) {
    return <div className="flex h-dvh items-center justify-center">Загрузка...</div>;
  }

  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <Container className="space-y-6">
        <button
          onClick={() => router.push('/keywords')}
          className="cursor-pointer px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
        >
          ← К всем словам
        </button>

        <h1 className="text-2xl font-bold">{data.keyword.term}</h1>
        <p>{data.keyword.definition}</p>

        {data.keyword.sources?.length && (
          <div className="space-y-1">
            <h2 className="font-semibold mb-1">Источники:</h2>
            {data.keyword.sources.map((s, idx) => (
              <div key={idx}>
                {s.name ? `${s.name}: ` : ''}
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {s.url}
                </a>
              </div>
            ))}
          </div>
        )}

        <div className="w-full h-[60vh] md:h-[70vh] lg:h-[75vh] border rounded-lg overflow-hidden">
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
