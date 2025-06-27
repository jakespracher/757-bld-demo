import { generateHaiku } from '@/app/api/haiku/route';
import Link from 'next/link';

export async function HaikuDisplay() {
    try {
        // Call the helper function directly
        const data = await generateHaiku();

        return (
            <div className="text-center py-8">
                <div className="max-w-md mx-auto">
                    <h2 className="text-2xl font-bold mb-6">HRBT Traffic Haiku</h2>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <pre className="whitespace-pre-wrap text-lg font-mono text-gray-800 dark:text-gray-200">
                            {data.haiku}
                        </pre>
                    </div>
                    <Link
                        href="/"
                        className="mt-4 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                        Generate New Haiku
                    </Link>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Haiku fetch error:', error);
        return (
            <div className="text-center py-8">
                <p className="text-red-500 mb-4">
                    Error: {error instanceof Error ? error.message : 'Failed to fetch haiku'}
                </p>
                <Link
                    href="/"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Try Again
                </Link>
            </div>
        );
    }
} 