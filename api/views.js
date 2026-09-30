import { list, put } from '@vercel/blob';

export default async function handler(req, res) {
  // Matikan semua bentuk cache agar data selalu fresh/real-time
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const BLOB_FILENAME = 'views.json';

  try {
    // Cari file di blob store
    const { blobs } = await list({ prefix: BLOB_FILENAME });
    const existingBlob = blobs.find((b) => b.pathname === BLOB_FILENAME);

    let currentViews = 0;

    if (existingBlob) {
      // Ambil data dengan menyertakan header authorization token dari Vercel
      const blobResponse = await fetch(existingBlob.url, {
        headers: {
          Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
        },
        cache: 'no-store',
      });

      if (blobResponse.ok) {
        const data = await blobResponse.json();
        currentViews = typeof data.views === 'number' ? data.views : 0;
      }
    }

    // Jika ada query ?increment=1
    if (req.query.increment === '1' || req.query.increment === 'true') {
      currentViews += 1;
    }

    // Simpan kembali ke Blob Store (private mode)
    await put(BLOB_FILENAME, JSON.stringify({ views: currentViews }), {
      access: 'private',
      addRandomSuffix: false,
      contentType: 'application/json',
    });

    return res.status(200).json({ views: currentViews });
  } catch (error) {
    console.error('Blob view counter error:', error);
    // Jika benar-benar gagal, kembalikan status 500/error log agar tidak menyamarkan nilai 1
    return res.status(500).json({ error: error.message });
  }
}