import { timingSafeEqual } from 'node:crypto';

// Confere a senha do painel (variável ADMIN_PASSWORD no Vercel).
export function checkAuth(req) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return { ok: false, status: 500, msg: 'A variável ADMIN_PASSWORD ainda não foi configurada no Vercel.' };
  let given = '';
  try { given = decodeURIComponent(String(req.headers['x-admin-password'] || '')); } catch (e) { given = ''; }
  const a = Buffer.from(given), b = Buffer.from(real);
  const ok = a.length === b.length && timingSafeEqual(a, b);
  return ok ? { ok: true } : { ok: false, status: 401, msg: 'Senha incorreta.' };
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
