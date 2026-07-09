# LokerTrack

Dashboard untuk melacak lamaran kerja — dari status *wishlist*, *applied*, *screening*, *interview*, *offer*, sampai *closed*. Menampilkan ringkasan statistik, grafik, dan tabel lamaran yang bisa dicari dan difilter per status.

Project ini adalah **monorepo** berisi dua bagian:

| Folder                 | Deskripsi                                                |
|-------------------------|-----------------------------------------------------------|
| `loker-track/`          | Frontend — React + Vite + Tailwind CSS, React Router, React Query |
| `loker-track-backend/`  | Backend — REST API dengan Express, siap pakai in-memory store atau MySQL |

## Prasyarat

- [Node.js](https://nodejs.org/) v18 ke atas
- npm (sudah termasuk saat install Node.js)
- (Opsional) MySQL, hanya diperlukan kalau mau pakai database sungguhan — tanpa ini pun aplikasi tetap bisa jalan dengan data sementara (in-memory)

## Menjalankan Backend

```bash
cd loker-track-backend
npm install
cp .env.example .env
npm run dev
```

Backend akan jalan di `http://localhost:4000`. Cek `http://localhost:4000/health` di browser — kalau muncul `{"status":"ok"}`, backend sudah aktif.

Secara default backend jalan pakai **in-memory store** (`DATA_SOURCE=memory` di `.env`), jadi bisa langsung dicoba tanpa setup database. Data akan direset setiap backend di-restart.

### (Opsional) Pakai database MySQL beneran

1. Import struktur tabel yang sudah disiapkan:
   ```bash
   mysql -u root -p < schema.sql
   ```
2. Buka `.env`, isi kredensial database (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`) lalu ubah:
   ```
   DATA_SOURCE=mysql
   ```
3. Restart backend (`npm run dev`). Cek lagi `http://localhost:4000/health` — kalau `dataSource` sudah `"mysql"`, berarti sudah terhubung ke database.

## Menjalankan Frontend

Buka terminal baru (biarkan backend tetap jalan di terminal sebelumnya):

```bash
cd loker-track
npm install
npm run dev
```

Frontend akan jalan di `http://localhost:5173`. Buka URL tersebut di browser.

> Frontend sudah otomatis mengarah ke backend di `http://localhost:4000/api`. Kalau backend dijalankan di port/alamat lain, atur lewat variabel `VITE_API_URL` pada file `.env` di folder `loker-track/` (lihat contoh di `.env.example`).

## Ringkasan Menjalankan Semuanya

```bash
# Terminal 1 — backend
cd loker-track-backend
npm install
cp .env.example .env
npm run dev

# Terminal 2 — frontend
cd loker-track
npm install
npm run dev
```

Lalu buka `http://localhost:5173`.

## Fitur

- **Dashboard** — ringkasan statistik, grafik mingguan, dan aktivitas terbaru
- **Lamaran Aktif** — tabel semua lamaran yang sudah dikirim, bisa difilter per status
- **Wishlist** — daftar lowongan yang ingin dilamar, dengan tombol tandai "sudah apply"
- Routing antar halaman menggunakan **React Router** (`/`, `/active`, `/wishlist`)
- Pengambilan & sinkronisasi data menggunakan **React Query**
- Backend REST API dengan Express, siap dipindah dari in-memory ke **MySQL**

## Endpoint API

| Method | Path                        | Keterangan                                   |
|--------|------------------------------|-----------------------------------------------|
| GET    | `/api/jobs`                  | List semua lamaran (`?status=`, `?search=`)   |
| GET    | `/api/jobs/stats/overview`   | Total + jumlah per status                     |
| GET    | `/api/jobs/:id`               | Detail satu lamaran                           |
| POST   | `/api/jobs`                    | Tambah lamaran baru                           |
| PUT    | `/api/jobs/:id`                 | Update lamaran                                |
| DELETE | `/api/jobs/:id`                  | Hapus lamaran                                 |
