// Real pipeline order: a job application genuinely moves through these
// stages, so the sequence (and the filter tab order) carries information.
export const STATUSES = [
  { id: 'wishlist', label: 'Wishlist', pill: 'bg-slate-100 text-slate-600', dot: 'bg-slate-400' },
  { id: 'applied', label: 'Applied', pill: 'bg-blue-50 text-blue-600', dot: 'bg-blue-500' },
  { id: 'screening', label: 'Screening', pill: 'bg-amber-50 text-amber-600', dot: 'bg-amber-500' },
  { id: 'interview', label: 'Interview', pill: 'bg-violet-50 text-violet-600', dot: 'bg-violet-500' },
  { id: 'offer', label: 'Offer', pill: 'bg-emerald-50 text-emerald-600', dot: 'bg-emerald-500' },
  { id: 'closed', label: 'Closed', pill: 'bg-rose-50 text-rose-600', dot: 'bg-rose-500' },
]

export const statusById = Object.fromEntries(STATUSES.map((s) => [s.id, s]))
