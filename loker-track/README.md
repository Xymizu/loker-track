# LokerTrack — Dashboard Lacak Lamaran Kerja

Frontend untuk web manajemen loker: dashboard, ringkasan status, dan tabel lamaran dari wishlist sampai offer.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:5173

## Build produksi

```bash
npm run build
npm run preview
```

## Struktur

- `src/App.jsx` — layout utama (sidebar + konten), state management
- `src/hooks/useJobs.js` — penyimpanan data (localStorage untuk sekarang; tinggal diganti ke API/backend nanti)
- `src/components/`
  - `Sidebar.jsx` — navigasi (Dashboard / Lamaran Aktif / Wishlist)
  - `Topbar.jsx` — breadcrumb, pencarian, tombol entri baru
  - `PromoBanner.jsx` — ringkasan mingguan (gradient banner)
  - `StatsRow.jsx` — 4 kartu statistik
  - `OverviewCharts.jsx` — grafik batang mingguan + donut distribusi status
  - `ApplicationsTable.jsx` — tabel lamaran dengan tab filter status
  - `EntryModal.jsx` — form tambah/ubah/hapus lamaran
- `src/data/statuses.js` — konfigurasi 6 tahap: Wishlist → Applied → Screening → Interview → Offer → Closed

## Catatan

Data tersimpan di localStorage browser (belum terhubung ke backend). Saat backend sudah siap, cukup ganti isi `useJobs.js` dengan pemanggilan API — struktur data job (company, position, location, source, link, appliedDate, salary, notes, status) sudah dirancang untuk gampang di-map ke skema database.
