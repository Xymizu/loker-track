-- LokerTrack — schema siap import.
-- Cara pakai:
--   mysql -u root -p < schema.sql
-- atau lewat phpMyAdmin/TablePlus/dsb: buka file ini lalu jalankan semuanya.

CREATE DATABASE IF NOT EXISTS loker_track
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE loker_track;

CREATE TABLE IF NOT EXISTS jobs (
  id            CHAR(36)     NOT NULL PRIMARY KEY,
  company       VARCHAR(150) NOT NULL,
  position      VARCHAR(150) NOT NULL,
  location      VARCHAR(150) DEFAULT '',
  source        VARCHAR(100) DEFAULT '',
  link          VARCHAR(500) DEFAULT '',
  applied_date  DATE         DEFAULT NULL,
  salary        VARCHAR(100) DEFAULT '',
  notes         TEXT,
  status        ENUM('wishlist', 'applied', 'screening', 'interview', 'offer', 'closed')
                NOT NULL DEFAULT 'wishlist',
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed data (sama seperti src/data/seed.js) — opsional, boleh dihapus baris di bawah ini.
INSERT INTO jobs (id, company, position, location, source, link, applied_date, salary, notes, status)
VALUES
  (UUID(), 'Nusantara Digital', 'Frontend Engineer', 'Jakarta (Hybrid)', 'LinkedIn', '', '2026-06-18',
   'Rp 12–15jt', 'Kontak: Budi (HR). Follow up minggu depan kalau belum ada kabar.', 'interview'),
  (UUID(), 'Kopi Sistem', 'Product Designer', 'Remote', 'Referral', '', '2026-06-25',
   '', '', 'applied'),
  (UUID(), 'Arka Fintech', 'Data Analyst', 'Jakarta', 'Website perusahaan', '', NULL,
   '', 'Cek dulu requirement SQL-nya sebelum apply.', 'wishlist');
