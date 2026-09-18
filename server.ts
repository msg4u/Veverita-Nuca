import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Dynamic TTS Cache
  const ttsCache = new Map<string, Buffer>();

  function splitTextIntoSafeChunks(text: string, maxLen = 85): string[] {
    const clean = text
      .replace(/[—–]/g, ', ')
      .replace(/[„”"«»]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    const parts = clean.split(/([.,!?;:]\s*)/).filter(Boolean);
    const chunks: string[] = [];
    let current = '';

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if ((current + part).length <= maxLen) {
        current += part;
      } else {
        if (current.trim()) chunks.push(current.trim());
        if (part.length > maxLen) {
          const words = part.split(' ');
          let sub = '';
          for (const w of words) {
            if ((sub + ' ' + w).trim().length <= maxLen) {
              sub = (sub + ' ' + w).trim();
            } else {
              if (sub.trim()) chunks.push(sub.trim());
              sub = w;
            }
          }
          current = sub;
        } else {
          current = part;
        }
      }
    }
    if (current.trim()) chunks.push(current.trim());
    return chunks;
  }

  // Romanian Female TTS Endpoint with caching for any dynamic speech
  app.get('/api/tts', async (req, res) => {
    const rawText = ((req.query.text as string) || '').trim();
    if (!rawText) {
      return res.status(400).send('Text is required');
    }

    // Check memory cache
    if (ttsCache.has(rawText)) {
      const cached = ttsCache.get(rawText)!;
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
      return res.send(cached);
    }

    try {
      const chunks = splitTextIntoSafeChunks(rawText);
      const buffers: Buffer[] = [];
      for (const c of chunks) {
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ro&client=tw-ob&q=${encodeURIComponent(c)}`;
        const r = await fetch(url, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
        });
        if (!r.ok) {
          throw new Error(`TTS upstream status: ${r.status}`);
        }
        const ab = await r.arrayBuffer();
        buffers.push(Buffer.from(ab));
        await new Promise((resolve) => setTimeout(resolve, 40));
      }
      const fullBuffer = Buffer.concat(buffers);
      ttsCache.set(rawText, fullBuffer);

      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
      res.send(fullBuffer);
    } catch (err: any) {
      console.error('Error in /api/tts:', err.message);
      res.status(500).send('TTS generation failed');
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
