---
name: add-feature
description: Alur standar menambahkan fitur baru ke Better Life. Pakai skill ini setiap kali diminta membuat fitur/sub-fitur apa pun.
---

# Alur Menambah Fitur (Better Life)

1. **Baca `docs/BETTER_LIFE_SPEC.md`** — cari bagian fitur terkait (§3 schema, §5 layar, §6 desain, §7 fase).
2. **Cek fase** — fitur ini masuk fase berapa? Jika di luar roadmap, tanyakan ke user dulu.
3. **Database dulu** — jika butuh tabel/kolom baru, buat migrasi SQL bernomor baru di `supabase/migrations/` (jangan edit migrasi lama). Jalankan RLS + policy.
4. **Backend/RLS** — pastikan akses data sudah benar via Supabase client.
5. **UI** — ikut design system spek §6 (warna, radius, font, empty state). Progress bar animated.
6. **Reward hook** — jika fitur menghasilkan aksi sukses, hubungkan ke XP engine (`xp_events` + update `profiles.xp`, cek level up & badge).
7. **Test** — sebutkan cara mengetes fitur ini secara manual.
8. **Lapor** — ringkas: apa yang dibuat, file apa yang berubah, cara test.
