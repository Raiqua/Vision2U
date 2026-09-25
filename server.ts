import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
app.use(express.json({ limit: '10mb' }));

// Initialize Gemini API if key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

// Server health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!apiKey,
    service: 'Vision2U Brand Intelligence Engine',
  });
});

// Multi-Agent Execution Endpoint
app.post('/api/agent', async (req, res) => {
  try {
    const { agentRole, systemPrompt, userMessage, jsonSchema } = req.body;

    if (!apiKey || !ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured on the server. Falling back to local intelligence mode.',
        fallback: true,
      });
    }

    const fullPrompt = `${systemPrompt}\n\n=== USER INPUT & WORKFLOW CONTEXT ===\n${userMessage}\n\nRespond strictly with valid, unescaped JSON matching the requested schema. Do not include markdown code block backticks unless strictly JSON.`;

    // Try models in cascade: gemini-3.1-flash-lite has optimal throughput & availability, followed by latest aliases
    const candidateModels = ['gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash'];
    let lastError: any = null;
    let responseText = '';

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
          config: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        });
        if (response.text) {
          responseText = response.text;
          break;
        }
      } catch (err: any) {
        console.warn(`[Vision2U AI] Model ${model} returned error, trying fallback model...`, err?.message || err);
        lastError = err;
      }
    }

    if (!responseText) {
      throw lastError || new Error('All model attempts failed');
    }

    return res.json({ result: responseText });
  } catch (error: any) {
    console.error('Agent generation error:', error);
    return res.status(500).json({
      error: error.message || 'AI generation failed',
      fallback: true,
    });
  }
});

async function main() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Vision2U server active on http://0.0.0.0:${port}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
});
