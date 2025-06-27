// @jest-environment node
// If you see a type error for node-fetch, run: npm install --save-dev @types/node-fetch
import type { } from '@jest/globals';
import request from 'supertest';
import { createServer } from 'http';
import { NextRequest } from 'next/server';
import { POST } from '../app/api/haiku/route';

// eslint-disable-next-line jest/expect-expect

describe('/api/haiku API Route', () => {
    const apiKey = process.env.OPENAI_API_KEY;

    it('should return a haiku from OpenAI', async () => {
        if (!apiKey) {
            console.warn('OPENAI_API_KEY not set, skipping test.');
            return;
        }

        // Create a mock request
        const mockReq = new NextRequest('http://localhost:3000/api/haiku', {
            method: 'POST',
        });

        // Call the API route handler directly
        const response = await POST(mockReq);
        const data = await response.json() as { haiku: string };

        expect(response.status).toBe(200);
        expect(data.haiku).toBeDefined();
        expect(typeof data.haiku).toBe('string');
        expect(data.haiku.split('\n').length).toBeGreaterThanOrEqual(3); // likely a haiku
    });
}); 