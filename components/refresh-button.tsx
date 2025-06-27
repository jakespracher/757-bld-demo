'use client';

import { useRouter } from 'next/navigation';

export function RefreshButton() {
    const router = useRouter();

    const handleRefresh = async () => {
        try {
            // Make a fetch request to trigger the refresh
            const response = await fetch('/?refresh=true');

            if (response.ok) {
                // Wait a moment for the server to process, then navigate to clean URL
                setTimeout(() => {
                    router.push('/');
                }, 200);
            } else {
                // If there's an error, just navigate to clean URL
                router.push('/');
            }
        } catch (error) {
            console.error('Refresh error:', error);
            // Fallback to clean URL
            router.push('/');
        }
    };

    return (
        <div className="mt-12">
            <button
                onClick={handleRefresh}
                className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
                refresh
            </button>
        </div>
    );
} 