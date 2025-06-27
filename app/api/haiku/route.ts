import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'OpenAI API key not set' }, { status: 500 });
        }

        const prompt = `Write a haiku about the beauty of code.`;
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: prompt },
                ],
                max_tokens: 60,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            return NextResponse.json({ error }, { status: response.status });
        }

        const data = await response.json();
        const haiku = data.choices?.[0]?.message?.content?.trim();
        return NextResponse.json({ haiku });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
} 