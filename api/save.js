import { put } from '@vercel/blob';
import { checkAuth, sleep } from '../lib/auth.js';
import { sanitize } from '../lib/validate.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido.' });
  const a = checkAuth(req);
  if (!a.ok) { await sleep(700); return res.status(a.status).json({ error: a.msg }); }
  try {
    const clean = sanitize(req.body);
    await put('site/content.json', JSON.stringify(clean), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 60,
    });
    return res.status(200).json({ ok: true, content: clean });
  } catch (e) {
    return res.status(500).json({ error: 'Não consegui salvar. Confira se o Blob está conectado ao projeto no Vercel.' });
  }
}
