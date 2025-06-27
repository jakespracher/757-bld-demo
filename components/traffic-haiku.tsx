import { getTrafficStatus } from '@/app/api/traffic/route';
import { generateHaiku } from '@/app/api/haiku/route';

export async function TrafficHaiku() {
    try {
        // Get traffic status first
        const traffic = await getTrafficStatus();

        console.log('Traffic status:', traffic.status); // Debug log

        // Generate haiku based on traffic status
        const haikuData = await generateHaiku(traffic.status);

        const getStatusColor = (status: string) => {
            switch (status) {
                case 'heavy':
                    return 'bg-red-100 border-red-300 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200';
                case 'moderate':
                    return 'bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200';
                case 'clear':
                    return 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200';
                default:
                    return 'bg-gray-100 border-gray-300 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200';
            }
        };

        const getStatusIcon = (status: string) => {
            switch (status) {
                case 'heavy':
                    return '🚗💨'; // Car with speed lines
                case 'moderate':
                    return '🚗'; // Car
                case 'clear':
                    return '🛣️'; // Road
                default:
                    return '❓'; // Question mark
            }
        };

        return (
            <div className="text-center py-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">HRBT Traffic Haiku</h1>

                    {/* Haiku Section */}
                    <div className="mb-8">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-sm">
                            <pre className="whitespace-pre-wrap text-2xl font-mono text-gray-800 dark:text-gray-200 leading-relaxed">
                                {haikuData.haiku}
                            </pre>
                        </div>
                    </div>

                    {/* Traffic Status Section */}
                    <div className={`border-2 rounded-lg p-6 ${getStatusColor(traffic.status)}`}>
                        <div className="text-4xl mb-4">{getStatusIcon(traffic.status)}</div>
                        <h2 className="text-2xl font-semibold mb-2 capitalize">{traffic.status} Traffic</h2>
                        <p className="mb-4 text-lg">{traffic.description}</p>
                        <div className="text-sm space-y-2">
                            <p><strong>Current Speed:</strong> {traffic.currentSpeed} mph</p>
                            <p><strong>Free Flow Speed:</strong> {traffic.freeFlowSpeed} mph</p>
                            <p className="text-xs opacity-75">
                                Last updated: {new Date(traffic.timestamp).toLocaleTimeString()}
                            </p>
                        </div>
                    </div>

                    <a
                        href="/"
                        className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg"
                    >
                        Refresh
                    </a>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Traffic haiku error:', error);
        return (
            <div className="text-center py-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">HRBT Traffic Haiku</h1>
                    <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-8 dark:bg-gray-900 dark:border-gray-700">
                        <div className="text-4xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-semibold mb-4">Service Unavailable</h2>
                        <p className="mb-4">Unable to fetch traffic data or generate haiku</p>
                        <p className="text-sm text-red-600 dark:text-red-400">
                            Error: {error instanceof Error ? error.message : 'Unknown error'}
                        </p>
                    </div>
                    <a
                        href="/"
                        className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg"
                    >
                        Try Again
                    </a>
                </div>
            </div>
        );
    }
} 