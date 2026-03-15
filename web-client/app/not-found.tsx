import Container from '@/components/container/Container';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="py-12 bg-white dark:bg-gray-800 min-h-dvh">
      <Container className="space-y-6">
        <h1 className="text-3xl font-semibold">Страница не найдена</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <Link
          href="/keywords"
          className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Перейти к глоссарию
        </Link>
      </Container>
    </section>
  );
}
