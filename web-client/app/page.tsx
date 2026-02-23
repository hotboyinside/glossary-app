import Container from '@/components/container/Container';
import { appRoutes } from '@/constants/appRoutes';
import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="py-12 bg-gradient-to-r from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Container className="space-y-16">
        {/* Hero */}
        <div className="text-center space-y-6">
          <h1 className="text-3xl sm:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
            Исследование производительности метаплатформенных архитектур
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Веб-приложение для анализа метрик производительности и изучения ключевых понятий,
            используемых при интеграции доменных приложений в архитектуре метаплатформы.
          </p>
          <a
            href="#features"
            className="inline-block px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
          >
            Узнать больше
          </a>
        </div>

        {/* Description */}
        <div className="space-y-6 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-center">
          <p>
            Данное приложение разработано в рамках университетской работы на тему{' '}
            <strong>
              «Экспериментальное исследование метрик производительности и оптимизация интеграции
              доменных приложений в архитектуре метаплатформы»
            </strong>
            .
          </p>
          <p>
            Цель проекта — наглядно представить результаты экспериментов, связанных с измерением и
            анализом производительности, а также систематизировать терминологию предметной области.
          </p>
        </div>

        {/* Features */}
        <div id="features" className="grid gap-8 sm:grid-cols-2">
          <div className="rounded-xl border p-6 hover:shadow-lg transition hover:border-indigo-400">
            <h3 className="font-semibold mb-2 text-indigo-600">📊 Визуализация метрик</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Графическое отображение экспериментальных данных для анализа производительности
              системы.
            </p>
          </div>

          <Link
            href={appRoutes.keywords}
            className="rounded-xl border p-6 hover:shadow-lg transition cursor-pointer hover:border-indigo-400 block"
          >
            <h3 className="font-semibold mb-2 text-indigo-600">📘 Глоссарий</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Структурированный справочник терминов и определений предметной области.
            </p>
          </Link>
        </div>

        {/* Stats / Key numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-indigo-50 dark:bg-gray-700 rounded-xl">
            <p className="text-2xl font-bold text-indigo-600">24+</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Экспериментов</p>
          </div>
          <div className="p-4 bg-indigo-50 dark:bg-gray-700 rounded-xl">
            <p className="text-2xl font-bold text-indigo-600">9+</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Метрик</p>
          </div>
          <div className="p-4 bg-indigo-50 dark:bg-gray-700 rounded-xl">
            <p className="text-2xl font-bold text-indigo-600">35+</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Определений</p>
          </div>
          <div className="p-4 bg-indigo-50 dark:bg-gray-700 rounded-xl">
            <p className="text-2xl font-bold text-indigo-600">2</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Основные секции</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
