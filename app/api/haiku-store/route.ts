import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateHaiku } from '@/lib/haiku-store';

export const runtime = 'edge';

// HTTP API route handler
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const forceRefresh = searchParams.get('refresh') === 'true';

        const result = await getOrCreateHaiku(forceRefresh);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
} 