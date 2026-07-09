import { v4 as uuidv4 } from 'uuid'

const now = () => new Date().toISOString()

export const SEED_JOBS = [
  {
    id: uuidv4(),
    company: 'Nusantara Digital',
    position: 'Frontend Engineer',
    location: 'Jakarta (Hybrid)',
    source: 'LinkedIn',
    link: '',
    applied_date: '2026-06-18',
    salary: 'Rp 12–15jt',
    notes: 'Kontak: Budi (HR). Follow up minggu depan kalau belum ada kabar.',
    status: 'interview',
    created_at: now(),
    updated_at: now(),
  },
  {
    id: uuidv4(),
    company: 'Kopi Sistem',
    position: 'Product Designer',
    location: 'Remote',
    source: 'Referral',
    link: '',
    applied_date: '2026-06-25',
    salary: '',
    notes: '',
    status: 'applied',
    created_at: now(),
    updated_at: now(),
  },
  {
    id: uuidv4(),
    company: 'Arka Fintech',
    position: 'Data Analyst',
    location: 'Jakarta',
    source: 'Website perusahaan',
    link: '',
    applied_date: '',
    salary: '',
    notes: 'Cek dulu requirement SQL-nya sebelum apply.',
    status: 'wishlist',
    created_at: now(),
    updated_at: now(),
  },
]
