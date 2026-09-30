import { Redis } from '@upstash/redis';

// Menggunakan environment variables yang dikoneksikan oleh Upstash
const redis = Redis.fromEnv();

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const isIncrement = req.query.increment === '1' || req.query.increment === 'true';
    let views = 0;

    if (isIncrement) {
      // Tambah count secara real-time (+1)
      views = await redis.incr('portfolio_views');
    } else {
      views = (await redis.get('portfolio_views')) || 0;
    }

    return res.status(200).json({ views: Number(views) });
  } catch (error) {
    console.error('Redis Error:', error);
    return res.status(500).json({ error: error.message });
  }
}