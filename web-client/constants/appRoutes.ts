export const appRoutes = {
  home: '/',
  keywords: '/keywords',
  keywordById: (id: string) => `/keywords/${id}`,
} as const;
