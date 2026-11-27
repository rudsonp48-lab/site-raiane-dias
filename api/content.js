import { list } from '@vercel/blob';

// Público: o site chama aqui para pegar valores, contatos e fotos salvos pelo painel.
export default async function handler(req, res) {
  try {
    const { blobs } = await list({ prefix: 'site/content.json', limit: 1 });
    if (!blobs.length) {
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json({});
    }
    const r = await fetch(blobs[0].url + '?v=' + Date.now());
    if (!r.ok) throw new Error('blob ' + r.status);
    const data = await r.json();
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=10, stale-while-revalidate=30');
    return res.status(200).json(data);
  } catch (e) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({});
  }
}
