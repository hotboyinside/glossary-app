import type { NextConfig } from 'next';

const apiHost = process.env.NEXT_PUBLIC_API_URL;

const cspHeader = `
    default-src 'self';

    script-src
      'self'
      'unsafe-inline'
      'unsafe-eval'
      https://mc.yandex.ru
      https://mc.yandex.com 
      https://metrika.yandex.ru
      https://metrika.yandex.by
      https://metrica.yandex.com
      https://metrica.yandex.com.tr;

    connect-src
      'self'
      ${apiHost}
      https://mc.yandex.ru 
      https://mc.yandex.com 
      https://metrika.yandex.ru
      https://metrika.yandex.by
      https://metrica.yandex.com
      https://metrica.yandex.com.tr;
    
    img-src
      'self'
      data:
      blob:
      https://mc.yandex.ru 
      https://mc.yandex.com
      https://metrika.yandex.ru
      https://metrika.yandex.by
      https://metrica.yandex.com
      https://metrica.yandex.com.tr;
    
    frame-src
      'self'
      https://metrika.yandex.ru
      https://metrica.yandex.com
      https://*.webvisor.com;
    
    frame-ancestors
      'self'
      https://metrika.yandex.ru
      https://metrica.yandex.com
      https://metrica.yandex.com.tr
      https://*.webvisor.com;
    
    style-src 'self' 'unsafe-inline';
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
  output: 'standalone',
};

export default nextConfig;
