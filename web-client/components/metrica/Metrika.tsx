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

    if (typeof window !== 'undefined' && window.ym) {
      window.ym(106953773, 'hit', url);
    }
  }, [pathName, searchParams]);

  return (
    <Script id="metrika" strategy="afterInteractive">
      {`
        (function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0];
          k.async=1;
          k.src=r;
          a.parentNode.insertBefore(k,a);
        })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=106953773", "ym");

        ym(106953773, "init", {
          ssr: true,
          webvisor: true,
          clickmap: true,
          ecommerce: "dataLayer",
          referrer: document.referrer,
          url: location.href,
          accurateTrackBounce: true,
          trackLinks: true
        });
      `}
    </Script>
  );
}
