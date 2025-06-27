import { getTrafficStatus } from '@/app/api/traffic/route';

export async function TrafficStatus() {
    try {
        const traffic = await getTrafficStatus();

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
                <div className="max-w-md mx-auto">
                    <h2 className="text-2xl font-bold mb-6">HRBT Traffic Status</h2>
                    <div className={`border-2 rounded-lg p-6 ${getStatusColor(traffic.status)}`}>
                        <div className="text-4xl mb-4">{getStatusIcon(traffic.status)}</div>
                        <h3 className="text-xl font-semibold mb-2 capitalize">{traffic.status} Traffic</h3>
                        <p className="mb-4">{traffic.description}</p>
                        <div className="text-sm space-y-1">
                            <p>Current Speed: {traffic.currentSpeed} km/h</p>
                            <p>Free Flow Speed: {traffic.freeFlowSpeed} km/h</p>
                            <p className="text-xs opacity-75">
                                Last updated: {new Date(traffic.timestamp).toLocaleTimeString()}
                            </p>
                        </div>
                    </div>
                    <a
                        href="/"
                        className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Refresh Status
                    </a>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Traffic status error:', error);
        return (
            <div className="text-center py-8">
                <div className="max-w-md mx-auto">
                    <h2 className="text-2xl font-bold mb-6">HRBT Traffic Status</h2>
                    <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-6 dark:bg-gray-900 dark:border-gray-700">
                        <div className="text-4xl mb-4">⚠️</div>
                        <h3 className="text-xl font-semibold mb-2">Status Unavailable</h3>
                        <p className="mb-4">Unable to fetch current traffic data</p>
                        <p className="text-sm text-red-600 dark:text-red-400">
                            Error: {error instanceof Error ? error.message : 'Unknown error'}
                        </p>
                    </div>
                    <a
                        href="/"
                        className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Try Again
                    </a>
                </div>
            </div>
        );
    }
} 