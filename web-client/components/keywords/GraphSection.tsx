'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import dynamic from 'next/dynamic';
import type { KeywordGraphData } from '@/types/keyword';

const Graph = dynamic(() => import('./Graph'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
    </div>
  ),
});

export default function GraphSection({ keyword, related }: KeywordGraphData) {
  const router = useRouter();

  const handleNodeClick = useCallback((id: string) => router.push(`/keywords/${id}`), [router]);

  return (
    <div className="w-full h-[60vh] md:h-[70vh] lg:h-[75vh] border border-black/10 dark:border-white/10 rounded-xl overflow-hidden">
      <Graph keyword={keyword} related={related} onNodeClick={handleNodeClick} />
    </div>
  );
}
