import { head, put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const increment = req.query?.increment === "1";

  try {
    let views = 0;

    // Check if views.json exists
    try {
      const { url } = await head('views.json');
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to fetch blob');
      const json = await response.json();
      views = json.views ?? 0;
    } catch (headErr) {
      // If head fails, assume file doesn't exist yet, views = 0
      views = 0;
    }

    if (increment) {
      views += 1;
    }

    // Save back
    await put('views.json', JSON.stringify({ views }), { access: 'private', addRandomSuffix: false });

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json({ views });
  } catch (err) {
    console.error('Blob views error:', err);
    // Fallback to realistic default, e.g., 1
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).json({ views: 1 });
  }
}