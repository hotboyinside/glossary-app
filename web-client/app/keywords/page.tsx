import Container from '@/components/container/Container';
import { apiRoutes } from '@/constants/apiRoutes';
import { appRoutes } from '@/constants/appRoutes';
import { fetchApi } from '@/api/fetchApi';
import { KeywordListItem } from '@/types/keyword';
import Link from 'next/link';

async function getKeywords(): Promise<KeywordListItem[]> {
  const { data } = await fetchApi<KeywordListItem[]>(`${apiRoutes.keywords}?limit=100`, {
    next: { revalidate: 60 },
  });
  return data ?? [];
}

export default async function KeywordsPage() {
  const keywords = await getKeywords();

  return (
    <section className="py-12 bg-white dark:bg-gray-800 min-h-dvh">
      <Container className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Глоссарий</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Термины и определения предметной области
          </p>
        </div>

        {keywords.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            Не удалось загрузить термины. Попробуйте позже.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {keywords.map((keywordData) => (
              <Link
                key={keywordData._id}
                href={appRoutes.keywordById(keywordData._id)}
                className="rounded-xl bg-white p-4 shadow-lg outline outline-black/5
                   transition hover:shadow-xl hover:-translate-y-0.5
                   dark:bg-slate-800 dark:shadow-none dark:outline-white/10"
              >
                <div className="font-medium">{keywordData.term}</div>
                <div className="text-sm text-neutral-400 mt-2 line-clamp-3 break-words">
                  {keywordData.definition}
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
