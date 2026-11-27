import { checkAuth, sleep } from '../lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido.' });
  const a = checkAuth(req);
  if (!a.ok) { await sleep(700); return res.status(a.status).json({ error: a.msg }); }
  return res.status(200).json({ ok: true });
}
