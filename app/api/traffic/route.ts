import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Helper function to get traffic data from TomTom
export async function getTrafficStatus() {
    try {
        const apiKey = process.env.TOMTOM_API_KEY;
        if (!apiKey) {
            throw new Error('TomTom API key not set');
        }

        // HRBT coordinates (approximate)
        const lat = 36.9665;
        const lon = -76.3272;
        const radius = 5000; // 5km radius around HRBT

        const url = `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key=${apiKey}&point=${lat},${lon}&unit=KMPH&openLr=false&thickness=1&pre=0&post=0`;

        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            console.error('TomTom API error:', errorData);
            throw new Error(`TomTom API error: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();

        // Extract traffic flow data
        const flowSegmentData = data.flowSegmentData;
        if (!flowSegmentData) {
            throw new Error('No traffic data received from TomTom');
        }

        // Determine traffic status based on current speed vs free flow speed
        const currentSpeed = flowSegmentData.currentSpeed;
        const freeFlowSpeed = flowSegmentData.freeFlowSpeed;

        let status: 'clear' | 'moderate' | 'heavy' = 'clear';
        let description = 'Traffic is flowing smoothly';

        if (currentSpeed && freeFlowSpeed) {
            const speedRatio = currentSpeed / freeFlowSpeed;

            if (speedRatio < 0.5) {
                status = 'heavy';
                description = 'Heavy traffic - expect delays';
            } else if (speedRatio < 0.8) {
                status = 'moderate';
                description = 'Moderate traffic - some delays';
            }
        }

        return {
            status,
            description,
            currentSpeed: currentSpeed || 'Unknown',
            freeFlowSpeed: freeFlowSpeed || 'Unknown',
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error('Get traffic status error:', error);
        throw error;
    }
}

// HTTP API route handler
export async function GET(req: NextRequest) {
    try {
        const result = await getTrafficStatus();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
} 