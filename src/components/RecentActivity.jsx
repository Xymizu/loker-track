import { statusById } from '../data/statuses'

function formatDate(d) {
  if (!d) return '—'
  const date = new Date(d + 'T00:00:00')
  if (Number.isNaN(date.getTime())) return d
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })
}

export default function RecentActivity({ jobs, onOpen, onSeeAll }) {
  const recent = [...jobs]
    .sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
    .slice(0, 5)

  return (
    <div className="bg-white rounded-2xl border border-surface-border shadow-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="font-semibold text-ink">Aktivitas terbaru</h2>
        <button onClick={onSeeAll} className="text-sm font-medium text-brand hover:text-brand-dark">
          Lihat semua →
        </button>
      </div>

      {recent.length === 0 ? (
        <div className="pb-10 text-center">
          <p className="text-ink-soft text-sm">Belum ada lamaran yang tercatat.</p>
        </div>
      ) : (
        <ul className="divide-y divide-surface-border">
          {recent.map((job) => {
            const status = statusById[job.status]
            return (
              <li
                key={job.id}
                onClick={() => onOpen(job)}
                className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-surface/60 cursor-pointer"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{job.company}</p>
                  <p className="text-xs text-ink-faint truncate">{job.position}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-ink-faint hidden sm:inline">
                    {formatDate(job.updatedAt)}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.pill}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {status.label}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
