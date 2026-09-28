---
name: db-migration
description: Cara standar membuat & menerapkan migrasi database Supabase/Postgres di Better Life.
---

# Migrasi Database (Better Life)

1. Lihat nomor migrasi terakhir di `supabase/migrations/`, lanjutkan nomor berikutnya: `003_xxx.sql`.
2. **Jangan pernah mengedit migrasi lama** — selalu buat file baru.
3. Setiap tabel baru wajib punya:
   - `id uuid primary key default gen_random_uuid()`
   - `created_at timestamptz default now()`
   - kolom `user_id uuid references profiles(id) on delete cascade` (kecuali tabel sistem seperti `badges`)
4. Langsung setelah `create table`, tulis:
   - `alter table <t> enable row level security;`
   - policy: `create policy "<t>_own" on <t> for all using (auth.uid() = user_id) with check (auth.uid() = user_id);`
5. Tabel `badges` (dan tabel sistem sejenis): read-only untuk user terautentikasi, hanya service role yang boleh insert/update.
6. Terapkan via `supabase db push` atau SQL editor, lalu verifikasi dengan query sederhana.
