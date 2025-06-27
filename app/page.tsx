import { TrafficHaiku } from "@/components/traffic-haiku";

interface PageProps {
  searchParams: Promise<{ refresh?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const forceRefresh = params.refresh === 'true';

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <TrafficHaiku forceRefresh={forceRefresh} />
      </div>
    </main>
  );
}
