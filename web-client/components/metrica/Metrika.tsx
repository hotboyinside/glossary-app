'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

interface YandexMetrika {
  (counterId: number, method: 'hit' | 'init' | string, ...args: unknown[]): void;
}

declare global {
  interface Window {
    ym?: YandexMetrika;
  }
}

const base = 'https://glossary-467285.ru';

export default function Metrika() {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = searchParams.toString();
    const url = base + pathName + (params ? '?' + params : '');

    if (window.ym) {
      window.ym(106953773, 'hit', url);
    }
  }, [pathName, searchParams]);

  return (
    <Script
      src="https://mc.yandex.ru/metrika/tag.js?id=106953773"
      strategy="afterInteractive"
      onLoad={() => {
        window.ym?.(106953773, 'init', {
          ssr: true,
          webvisor: true,
          clickmap: true,
          ecommerce: 'dataLayer',
          referrer: document.referrer,
          url: location.href,
          accurateTrackBounce: true,
          trackLinks: true,
        });
      }}
    />
  );
}
