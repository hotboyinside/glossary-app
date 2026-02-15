const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiRoutes = {
  keywords: `${BASE_URL}/keywords`,
  keywordByIdWithRelated: (id: string) => `${BASE_URL}/keywords/${id}/graph`,
} as const;
