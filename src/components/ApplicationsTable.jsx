import { useState } from 'react'
import { STATUSES, statusById } from '../data/statuses'

function formatDate(d) {
  if (!d) return '—'
  const date = new Date(d + 'T00:00:00')
  if (Number.isNaN(date.getTime())) return d
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function ApplicationsTable({
  jobs,
  onOpen,
  statusFilter,
  onStatusFilterChange,
  statuses = STATUSES,
  title = 'Daftar lamaran',
}) {
  const [openMenuId, setOpenMenuId] = useState(null)
  const tabs = [{ id: 'all', label: 'Semua' }, ...statuses.map((s) => ({ id: s.id, label: s.label }))]
  const shown = statusFilter === 'all' ? jobs : jobs.filter((j) => j.status === statusFilter)

  return (
    <div className="bg-white rounded-2xl border border-surface-border shadow-card overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-4 flex-wrap gap-3">
        <h2 className="font-semibold text-ink">{title}</h2>
      </div>

      <div className="flex items-center gap-1 px-5 mt-3 border-b border-surface-border overflow-x-auto">
        {tabs.map((tab) => {
          const active = statusFilter === tab.id
          const count =
            tab.id === 'all' ? jobs.length : jobs.filter((j) => j.status === tab.id).length
          return (
            <button
              key={tab.id}
              onClick={() => onStatusFilterChange(tab.id)}
              className={`relative px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                active ? 'text-brand' : 'text-ink-faint hover:text-ink-soft'
              }`}
            >
              {tab.label}
              {count > 0 && <span className="ml-1.5 text-xs text-ink-faint">{count}</span>}
              {active && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-brand rounded-full" />}
            </button>
          )
        })}
      </div>

      {shown.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-ink-soft text-sm">Belum ada lamaran di kategori ini.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-faint text-xs uppercase tracking-wide">
                <th className="font-medium px-5 py-3">Perusahaan</th>
                <th className="font-medium px-3 py-3">Posisi</th>
                <th className="font-medium px-3 py-3">Tanggal lamar</th>
                <th className="font-medium px-3 py-3">Lokasi</th>
                <th className="font-medium px-3 py-3">Status</th>
                <th className="font-medium px-3 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {shown.map((job) => {
                const status = statusById[job.status]
                return (
                  <tr
                    key={job.id}
                    className="border-t border-surface-border hover:bg-surface/60 cursor-pointer"
                    onClick={() => onOpen(job)}
                  >
                    <td className="px-5 py-3 font-medium text-ink">{job.company}</td>
                    <td className="px-3 py-3 text-ink-soft">{job.position}</td>
                    <td className="px-3 py-3 text-ink-soft">{formatDate(job.appliedDate)}</td>
                    <td className="px-3 py-3 text-ink-soft">{job.location || '—'}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.pill}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                        {status.label}
                      </span>
                    </td>
                    <td
                      className="px-3 py-3 text-right relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setOpenMenuId(openMenuId === job.id ? null : job.id)}
                        className="text-ink-faint hover:text-ink px-2 py-1 rounded-md hover:bg-surface"
                        aria-label="Aksi lainnya"
                      >
                        •••
                      </button>
                      {openMenuId === job.id && (
                        <div className="absolute right-3 top-9 z-10 bg-white border border-surface-border rounded-lg shadow-card-hover py-1 w-32">
                          <button
                            onClick={() => {
                              setOpenMenuId(null)
                              onOpen(job)
                            }}
                            className="w-full text-left px-3 py-1.5 text-sm text-ink-soft hover:bg-surface"
                          >
                            Ubah
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
