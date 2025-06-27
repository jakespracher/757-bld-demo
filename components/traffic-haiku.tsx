import { getOrCreateHaiku } from '@/app/api/haiku-store/route';
import { RefreshButton } from './refresh-button';

interface TrafficHaikuProps {
    forceRefresh?: boolean;
}

export async function TrafficHaiku({ forceRefresh = false }: TrafficHaikuProps) {
    try {
        // Get haiku from Supabase (with caching logic)
        const data = await getOrCreateHaiku(forceRefresh);

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
                        {data.haiku}
                    </pre>
                </div>

                {/* Traffic Status Section */}
                <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
                    <div className={`text-2xl mb-4 ${getStatusColor(data.trafficStatus)}`}>
                        {getStatusIcon(data.trafficStatus)}
                    </div>
                    <h2 className="text-lg font-light mb-2 capitalize text-slate-600 dark:text-slate-400">
                        {data.trafficStatus} traffic
                    </h2>
                    <div className="text-xs text-slate-400 dark:text-slate-500 space-y-1 mb-6">
                        <p>{data.currentSpeed} mph current • {data.freeFlowSpeed} mph free flow</p>
                        <p>Updated {new Date(data.timestamp).toLocaleTimeString()}</p>
                        {data.isCached && (
                            <p className="text-xs text-slate-300 dark:text-slate-600">(cached)</p>
                        )}
                        {!data.storageEnabled && (
                            <p className="text-xs text-amber-500 dark:text-amber-400">
                                (storage not configured - run SQL migration)
                            </p>
                        )}
                    </div>
                </div>

                {/* Refresh Button */}
                <RefreshButton />
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

                <RefreshButton />
            </div>
        );
    }
} 