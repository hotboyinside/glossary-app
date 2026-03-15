// Server (SSR) uses API_URL (Docker internal network), browser uses NEXT_PUBLIC_API_URL
const BASE_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? '';

export const apiRoutes = {
  keywords: `${BASE_URL}/keywords`,
  keywordByIdWithRelated: (id: string) => `${BASE_URL}/keywords/${id}/graph`,
} as const;
