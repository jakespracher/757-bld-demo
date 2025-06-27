// Helper function that can be called directly
export async function generateHaiku(trafficStatus?: 'clear' | 'moderate' | 'heavy') {
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error('OpenAI API key not set');
        }

        console.log('Generating haiku for traffic status:', trafficStatus); // Debug log

        let prompt: string;

        if (trafficStatus) {
            switch (trafficStatus) {
                case 'heavy':
                    prompt = `Write a humorous haiku about being stuck in heavy traffic on the Hampton Roads Bridge Tunnel (HRBT). The haiku should capture the frustration, absurdity, or dark humor of being completely stopped or crawling along. Make it funny and relatable for commuters who are stuck.`;
                    break;
                case 'moderate':
                    prompt = `Write a humorous haiku about moderate traffic on the Hampton Roads Bridge Tunnel (HRBT). The haiku should capture the mild frustration or resigned humor of slow-moving traffic. Make it entertaining and relatable for commuters. Don't mention crawling or being stuck.`;
                    break;
                case 'clear':
                    prompt = `Write a humorous haiku about miraculously clear traffic on the Hampton Roads Bridge Tunnel (HRBT). The haiku should capture the surprise, joy, or disbelief of smooth sailing through the tunnel. Make it funny and celebrate this rare occurrence.`;
                    break;
                default:
                    prompt = `Write a humorous haiku about traffic on the Hampton Roads Bridge Tunnel (HRBT). The haiku should be funny and capture the frustration, humor, or absurdity of being stuck in traffic. Make it entertaining and relatable for commuters.`;
            }
        } else {
            prompt = `Write a humorous haiku about traffic on the Hampton Roads Bridge Tunnel (HRBT). The haiku should be funny and capture the frustration, humor, or absurdity of being stuck in traffic. Make it entertaining and relatable for commuters.`;
        }

        console.log('Using prompt for:', trafficStatus); // Debug log

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

        console.log('Generated haiku for', trafficStatus, 'traffic'); // Debug log

        return { haiku };
    } catch (error) {
        console.error('Generate haiku error:', error);
        throw error;
    }
} 