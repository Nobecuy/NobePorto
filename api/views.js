import { put, list, del } from "@vercel/blob";

// Nama file JSON yang disimpan di Blob store kamu
const VIEWS_PATH = "portfolio-views.json";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const increment = req.query?.increment === "1";

  try {
    let currentViews = 0;
    let existingBlob = null;

    // Cari file views yang sudah ada di Blob store
    const { blobs } = await list({ prefix: VIEWS_PATH });

    if (blobs.length > 0) {
      existingBlob = blobs[0];
      // Fetch isi file (tambah nocache biar CDN tidak kasih data lama)
      const response = await fetch(
        `${existingBlob.url}?nocache=${Date.now()}`,
        { headers: { "Cache-Control": "no-cache" } }
      );
      if (response.ok) {
        const data = await response.json();
        currentViews = typeof data.views === "number" ? data.views : 0;
      }
    }

    if (increment) {
      currentViews += 1;

      // Hapus blob lama dulu biar tidak double, lalu tulis yang baru
      if (existingBlob) {
        await del(existingBlob.url);
      }

      await put(VIEWS_PATH, JSON.stringify({ views: currentViews }), {
        access: "private",
        contentType: "application/json",
        addRandomSuffix: false,
      });
    }

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ views: currentViews });
  } catch (err) {
    console.error("Blob views error:", err);
    return res.status(200).json({ views: 0 });
  }
}
