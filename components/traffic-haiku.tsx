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
                    return 'text-red-600 dark:text-red-400';
                case 'moderate':
                    return 'text-amber-600 dark:text-amber-400';
                case 'clear':
                    return 'text-emerald-600 dark:text-emerald-400';
                default:
                    return 'text-slate-600 dark:text-slate-400';
            }
        };

        const getStatusIcon = (status: string) => {
            switch (status) {
                case 'heavy':
                    return '●'; // Simple dot
                case 'moderate':
                    return '●'; // Simple dot
                case 'clear':
                    return '●'; // Simple dot
                default:
                    return '●'; // Simple dot
            }
        };

        return (
            <div className="text-center max-w-2xl mx-auto">
                {/* Haiku Section */}
                <div className="mb-16">
                    <pre className="whitespace-pre-wrap text-2xl md:text-3xl font-light text-slate-800 dark:text-slate-200 leading-relaxed">
                        {haikuData.haiku}
                    </pre>
                </div>

                {/* Traffic Status Section */}
                <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
                    <div className={`text-2xl mb-4 ${getStatusColor(traffic.status)}`}>
                        {getStatusIcon(traffic.status)}
                    </div>
                    <h2 className="text-lg font-light mb-2 capitalize text-slate-600 dark:text-slate-400">
                        {traffic.status} traffic
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mb-6">
                        {traffic.description}
                    </p>
                    <div className="text-xs text-slate-400 dark:text-slate-500 space-y-1">
                        <p>{traffic.currentSpeed} mph current • {traffic.freeFlowSpeed} mph free flow</p>
                        <p>Updated {new Date(traffic.timestamp).toLocaleTimeString()}</p>
                    </div>
                </div>

                {/* Refresh Link */}
                <div className="mt-12">
                    <a
                        href="/"
                        className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                        refresh
                    </a>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Traffic haiku error:', error);
        return (
            <div className="text-center max-w-2xl mx-auto">
                <div className="mb-16">
                    <pre className="whitespace-pre-wrap text-2xl md:text-3xl font-light text-slate-800 dark:text-slate-200 leading-relaxed">
                        Unable to fetch
                        traffic data at this time
                        please try again
                    </pre>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                        Error: {error instanceof Error ? error.message : 'Unknown error'}
                    </p>
                </div>

                <div className="mt-12">
                    <a
                        href="/"
                        className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                        try again
                    </a>
                </div>
            </div>
        );
    }
} 