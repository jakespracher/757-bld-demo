import { TrafficHaiku } from "@/components/traffic-haiku";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <TrafficHaiku />
      </div>
    </main>
  );
}
