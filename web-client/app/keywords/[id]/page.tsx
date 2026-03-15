import Container from '@/components/container/Container';
import GraphSection from '@/components/keywords/GraphSection';
import { apiRoutes } from '@/constants/apiRoutes';
import { fetchApi } from '@/api/fetchApi';
import { KeywordGraphData } from '@/types/keyword';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getKeywordData(id: string) {
  return fetchApi<KeywordGraphData>(apiRoutes.keywordByIdWithRelated(id), {
    next: { revalidate: 60 },
  });
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error, status } = await getKeywordData(id);

  if (status === 404) notFound();
  if (!data) throw new Error(error ?? 'Failed to load keyword data');

  return (
    <section className="py-12 bg-white dark:bg-gray-800 min-h-dvh">
      <Container className="space-y-6">
        <Link
          href="/keywords"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition"
        >
          ← К всем словам
        </Link>

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

        <GraphSection keyword={data.keyword} related={data.related} />
      </Container>
    </section>
  );
}
