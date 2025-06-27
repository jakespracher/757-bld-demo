import { NextResponse } from 'next/server';
import { getTrafficStatus } from '@/lib/traffic-status';

export const runtime = 'edge';

// HTTP API route handler
export async function GET() {
    try {
        const result = await getTrafficStatus();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
} 