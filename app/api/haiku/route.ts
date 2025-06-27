import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Helper function that can be called directly
export async function generateHaiku() {
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error('OpenAI API key not set');
        }

        const prompt = `Write a humorous haiku about traffic on the Hampton Roads Bridge Tunnel (HRBT). The haiku should be funny and capture the frustration, humor, or absurdity of being stuck in traffic. Make it entertaining and relatable for commuters.`;
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant that writes humorous haikus about traffic.' },
                    { role: 'user', content: prompt },
                ],
                max_tokens: 100,
                temperature: 0.8,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            console.error('OpenAI API error:', errorData);
            throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        const haiku = data.choices?.[0]?.message?.content?.trim();

        if (!haiku) {
            console.error('No haiku content received:', data);
            throw new Error('No haiku content received from OpenAI');
        }

        return { haiku };
    } catch (error) {
        console.error('Generate haiku error:', error);
        throw error;
    }
}

// HTTP API route handler
export async function POST(req: NextRequest) {
    try {
        const result = await generateHaiku();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
} 