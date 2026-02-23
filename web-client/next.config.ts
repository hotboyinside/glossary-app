import type { NextConfig } from 'next';

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://mc.yandex.ru;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://mc.yandex.ru;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    upgrade-insecure-requests;
    connect-src 'self' https://mc.yandex.ru wss://mc.yandex.ru;
    frame-src 'self' https://mc.yandex.ru;
    frame-ancestors 'self' https://metrika.yandex.ru https://metrica.yandex.com https://*.webvisor.com;
    child-src 'self' blob: https://mc.yandex.ru;
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
