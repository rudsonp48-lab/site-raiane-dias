import { put } from '@vercel/blob';
import { checkAuth, sleep } from '../lib/auth.js';
import { SLOTS } from '../lib/validate.js';

const TYPES = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
const MAX_BYTES = 3 * 1024 * 1024;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido.' });
  const a = checkAuth(req);
  if (!a.ok) { await sleep(700); return res.status(a.status).json({ error: a.msg }); }
  try {
    const { slot, dataUrl } = req.body || {};
    if (!SLOTS.includes(slot)) return res.status(400).json({ error: 'Foto desconhecida.' });
    const m = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(String(dataUrl || ''));
    if (!m) return res.status(400).json({ error: 'Arquivo de imagem inválido.' });
    const buf = Buffer.from(m[2], 'base64');
    if (buf.length > MAX_BYTES) return res.status(413).json({ error: 'Foto grande demais (máx. 3 MB).' });
    const blob = await put('site/img/' + slot + '.' + TYPES[m[1]], buf, {
      access: 'public',
      contentType: m[1],
      addRandomSuffix: true,
    });
    return res.status(200).json({ ok: true, url: blob.url });
  } catch (e) {
    return res.status(500).json({ error: 'Não consegui enviar a foto. Confira se o Blob está conectado ao projeto no Vercel.' });
  }
}
