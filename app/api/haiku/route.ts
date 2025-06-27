import { NextRequest, NextResponse } from 'next/server';
import { generateHaiku } from '@/lib/haiku-generator';

export const runtime = 'edge';

// HTTP API route handler
export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({}));
        const { trafficStatus } = body;

        const result = await generateHaiku(trafficStatus);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
} 