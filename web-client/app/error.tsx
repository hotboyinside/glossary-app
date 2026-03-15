'use client';

import Container from '@/components/container/Container';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="py-12 bg-white dark:bg-gray-800 min-h-dvh">
      <Container className="space-y-6">
        <h1 className="text-3xl font-semibold">Что-то пошло не так</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {error.message || 'Произошла непредвиденная ошибка.'}
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Попробовать снова
        </button>
      </Container>
    </section>
  );
}
