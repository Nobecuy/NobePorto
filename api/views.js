import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const increment = req.query?.increment === "1";

  try {
    let views;
    if (increment) {
      // Increment the counter and get the new value
      views = await kv.incr('portfolio_views');
    } else {
      // Get the current value
      views = await kv.get('portfolio_views');
      // If null, treat as 0
      if (views === null) {
        views = 0;
      }
    }

    return res.status(200).json({ views });
  } catch (err) {
    console.error("KV views error:", err);
    // Return a default value with fallback flag to prevent frontend crash
    return res.status(200).json({ views: 100, fallback: true });
  }
}