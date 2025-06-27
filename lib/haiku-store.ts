import { createClient } from '@/lib/supabase/server';
import { getTrafficStatus } from '@/lib/traffic-status';
import { generateHaiku } from '@/lib/haiku-generator';

// Helper function to get or create haiku from Supabase
export async function getOrCreateHaiku(forceRefresh: boolean = false) {
    try {
        const supabase = await createClient();

        // If not forcing refresh, try to get the latest haiku
        if (!forceRefresh) {
            const { data: existingHaiku, error: fetchError } = await supabase
                .from('haikus')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            // If table doesn't exist, fall back to generating without storage
            if (fetchError && fetchError.code === '42P01') {
                console.log('Haikus table not found, generating haiku without storage...');
                const traffic = await getTrafficStatus();
                const haikuData = await generateHaiku(traffic.status);

                return {
                    haiku: haikuData.haiku,
                    trafficStatus: traffic.status,
                    currentSpeed: traffic.currentSpeed,
                    freeFlowSpeed: traffic.freeFlowSpeed,
                    timestamp: new Date().toISOString(),
                    isCached: false,
                    storageEnabled: false
                };
            }

            if (fetchError && fetchError.code !== 'PGRST116') {
                console.error('Error fetching haiku:', fetchError);
                throw new Error('Failed to fetch haiku from database');
            }

            // If we have an existing haiku, check if it's still valid (less than 5 minutes old)
            if (existingHaiku) {
                const now = new Date();
                const haikuCreatedAt = new Date(existingHaiku.created_at);
                const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

                // If the haiku is still fresh (less than 5 minutes old), return it
                if (haikuCreatedAt > fiveMinutesAgo) {
                    console.log('Using cached haiku from', existingHaiku.created_at);
                    return {
                        haiku: existingHaiku.haiku,
                        trafficStatus: existingHaiku.traffic_status,
                        currentSpeed: existingHaiku.current_speed,
                        freeFlowSpeed: existingHaiku.free_flow_speed,
                        timestamp: existingHaiku.created_at,
                        isCached: true,
                        storageEnabled: true
                    };
                } else {
                    console.log('Cached haiku expired, generating new one...');
                }
            } else {
                console.log('No existing haiku found, generating new one...');
            }
        } else {
            console.log('Force refresh requested, generating new haiku...');
        }

        // Generate new haiku and traffic data
        const traffic = await getTrafficStatus();
        const haikuData = await generateHaiku(traffic.status);

        // Try to store in Supabase
        const { data: newHaiku, error: insertError } = await supabase
            .from('haikus')
            .insert({
                haiku: haikuData.haiku,
                traffic_status: traffic.status,
                current_speed: traffic.currentSpeed,
                free_flow_speed: traffic.freeFlowSpeed,
                description: traffic.description
            })
            .select()
            .single();

        if (insertError) {
            console.error('Error inserting haiku:', insertError);
            // Fall back to returning without storage
            return {
                haiku: haikuData.haiku,
                trafficStatus: traffic.status,
                currentSpeed: traffic.currentSpeed,
                freeFlowSpeed: traffic.freeFlowSpeed,
                timestamp: new Date().toISOString(),
                isCached: false,
                storageEnabled: false
            };
        }

        console.log('Stored new haiku at', newHaiku.created_at);
        return {
            haiku: newHaiku.haiku,
            trafficStatus: newHaiku.traffic_status,
            currentSpeed: newHaiku.current_speed,
            freeFlowSpeed: newHaiku.free_flow_speed,
            timestamp: newHaiku.created_at,
            isCached: false,
            storageEnabled: true
        };

    } catch (error) {
        console.error('getOrCreateHaiku error:', error);
        throw error;
    }
} 