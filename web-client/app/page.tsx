import Container from '@/components/container/Container';
import { ArrowRightIcon } from '@/components/icons/HomeIcons';
import { appRoutes } from '@/constants/appRoutes';
import { FEATURES, STATS } from '@/constants/homeData';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-28 overflow-hidden">
        {/* Background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center"
        >
          <div className="mt-[-80px] w-[900px] h-[600px] rounded-full bg-indigo-100 dark:bg-indigo-950/40 blur-3xl opacity-50" />
        </div>

        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-8">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-medium tracking-widest uppercase">
              ИТМО &nbsp;·&nbsp; Дипломная работа &nbsp;·&nbsp; 2026
            </span>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.08] text-gray-900 dark:text-white">
              Исследование{' '}
              <span className="text-indigo-600 dark:text-indigo-400">производительности</span>{' '}
              метаплатформенных архитектур
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Анализ метрик производительности и систематизация ключевых понятий при интеграции
              доменных приложений в архитектуре метаплатформы.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                href={appRoutes.keywords}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 active:bg-indigo-700 transition-colors"
              >
                Открыть глоссарий
                <ArrowRightIcon />
              </Link>
              <a
                href="#about"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                Узнать больше
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Stats band ── */}
      <div className="border-y border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/40">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100 dark:divide-gray-800">
            {STATS.map((stat) => (
              <div key={stat.label} className="py-8 px-4 text-center">
                <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ── About ── */}
      <section id="about" className="py-24">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-5">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              О проекте
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Приложение разработано в рамках дипломной работы{' '}
              <strong className="font-semibold text-gray-700 dark:text-gray-300">
                «Экспериментальное исследование метрик производительности и оптимизация интеграции
                доменных приложений в архитектуре метаплатформы»
              </strong>
              . Цель — наглядно представить результаты экспериментов и систематизировать
              терминологию предметной области.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Features ── */}
      <section
        id="features"
        className="py-24 bg-gray-50/60 dark:bg-gray-900/40 border-t border-gray-100 dark:border-gray-800"
      >
        <Container>
          <div className="max-w-xl mx-auto text-center mb-14">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Разделы
            </h2>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Два ключевых инструмента для изучения результатов исследования
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
            {FEATURES.map((feature) => {
              const card = (
                <div className="group relative p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-xl hover:shadow-indigo-100/40 dark:hover:shadow-indigo-950/40 transition-all duration-200 h-full">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                    <feature.Icon />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                  {feature.href && (
                    <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:gap-2.5 transition-all duration-150">
                      Перейти
                      <ArrowRightIcon />
                    </span>
                  )}
                </div>
              );

              return feature.href ? (
                <Link key={feature.title} href={feature.href} className="block">
                  {card}
                </Link>
              ) : (
                <div key={feature.title}>{card}</div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
