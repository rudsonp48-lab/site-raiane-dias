// Só aceita os campos que o site usa e limpa os valores.
export const SLOTS = ['hero', 'about', 'cta', 'svc1', 'svc2', 'svc3', 'svc4', 'aboutNails', 'pricesHeader'];
const MAX_ROWS = 12;

const str = (v, n) => (typeof v === 'string' ? v.trim().slice(0, n) : '');

function rows(list) {
  if (!Array.isArray(list)) return [];
  const out = [];
  for (const r of list.slice(0, MAX_ROWS)) {
    if (!Array.isArray(r)) continue;
    const name = str(r[0], 80);
    const num = Number(r[1]);
    if (!name || !Number.isFinite(num) || num < 0 || num > 99999) continue;
    out.push([name, Math.round(num * 100) / 100]);
  }
  return out;
}

function col(c, fallbackTitle) {
  c = c && typeof c === 'object' ? c : {};
  return { t: str(c.t, 60) || fallbackTitle, r: rows(c.r) };
}

function blobUrl(u) {
  if (typeof u !== 'string') return null;
  try {
    const x = new URL(u);
    return x.protocol === 'https:' && x.hostname.endsWith('.public.blob.vercel-storage.com') ? x.toString() : null;
  } catch (e) { return null; }
}

function servicos(list) {
  const src = Array.isArray(list) ? list : [];
  const out = [];
  for (let i = 0; i < 4; i++) {
    const s = src[i] && typeof src[i] === 'object' ? src[i] : {};
    out.push({ t: str(s.t, 60), d: str(s.d, 400) });
  }
  return out;
}

export function sanitize(body) {
  const b = body && typeof body === 'object' ? body : {};
  const links = b.links && typeof b.links === 'object' ? b.links : {};
  const photos = {};
  for (const k of SLOTS) photos[k] = blobUrl((b.photos || {})[k]);
  return {
    v: 1,
    links: {
      whatsapp: String(links.whatsapp || '').replace(/\D/g, '').slice(0, 15),
      instagram: String(links.instagram || '').replace(/^@/, '').replace(/[^A-Za-z0-9._]/g, '').slice(0, 40),
    },
    precos: {
      esq: col(b.precos && b.precos.esq, 'Serviços'),
      dir: col(b.precos && b.precos.dir, 'Remoção, reposição e manutenção'),
    },
    servicos: servicos(b.servicos),
    photos,
    updated: new Date().toISOString(),
  };
}
