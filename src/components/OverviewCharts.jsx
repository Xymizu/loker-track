import { STATUSES } from '../data/statuses'

const DOT_HEX = {
  'bg-slate-400': '#94A3B8',
  'bg-blue-500': '#3B82F6',
  'bg-amber-500': '#F59E0B',
  'bg-violet-500': '#8B5CF6',
  'bg-emerald-500': '#10B981',
  'bg-rose-500': '#F43F5E',
}

function getWeekBuckets(jobs, weeks = 6) {
  const now = new Date('2026-07-09T00:00:00')
  const buckets = []
  for (let i = weeks - 1; i >= 0; i--) {
    const end = new Date(now)
    end.setDate(end.getDate() - i * 7)
    const start = new Date(end)
    start.setDate(start.getDate() - 6)
    buckets.push({ start, end, count: 0 })
  }
  jobs.forEach((j) => {
    if (!j.appliedDate) return
    const d = new Date(j.appliedDate + 'T00:00:00')
    for (const b of buckets) {
      if (d >= b.start && d <= b.end) {
        b.count++
        break
      }
    }
  })
  return buckets
}

function WeeklyBarChart({ jobs }) {
  const buckets = getWeekBuckets(jobs)
  const max = Math.max(...buckets.map((b) => b.count), 1)

  return (
    <div className="bg-white rounded-2xl border border-surface-border p-5 shadow-card flex-1">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm text-ink-soft">Lamaran terkirim</p>
          <p className="text-xl font-bold text-ink">
            {buckets.reduce((s, b) => s + b.count, 0)}{' '}
            <span className="text-sm font-normal text-ink-faint">6 minggu terakhir</span>
          </p>
        </div>
      </div>
      <div className="flex items-end justify-between gap-2 h-36">
        {buckets.map((b, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full h-32 flex items-end rounded-md bg-surface overflow-hidden">
              <div
                className="w-full rounded-md bg-gradient-to-t from-brand to-violet-400 transition-all"
                style={{ height: `${(b.count / max) * 100}%`, minHeight: b.count ? '6px' : '0' }}
              />
            </div>
            <span className="text-[11px] text-ink-faint">
              {b.start.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatusDonut({ jobs }) {
  const total = jobs.length || 1
  let cumulative = 0
  const segments = STATUSES.map((s) => {
    const count = jobs.filter((j) => j.status === s.id).length
    const pct = (count / total) * 100
    const seg = { ...s, count, pct, from: cumulative, to: cumulative + pct }
    cumulative += pct
    return seg
  }).filter((s) => s.count > 0)

  const gradient = segments.length
    ? `conic-gradient(${segments
        .map((s) => `${DOT_HEX[s.dot]} ${s.from}% ${s.to}%`)
        .join(', ')})`
    : '#E7E8F2'

  return (
    <div className="bg-white rounded-2xl border border-surface-border p-5 shadow-card w-full lg:w-72 shrink-0">
      <p className="text-sm text-ink-soft mb-4">Distribusi status</p>
      <div className="flex items-center gap-5">
        <div
          className="w-24 h-24 rounded-full shrink-0 grid place-items-center"
          style={{ background: gradient }}
        >
          <div className="w-14 h-14 rounded-full bg-white grid place-items-center">
            <span className="text-sm font-bold text-ink">{jobs.length}</span>
          </div>
        </div>
        <ul className="space-y-1.5 min-w-0">
          {segments.map((s) => (
            <li key={s.id} className="flex items-center gap-2 text-xs">
              <span className={`w-2 h-2 rounded-full ${s.dot} shrink-0`} />
              <span className="text-ink-soft truncate">{s.label}</span>
              <span className="text-ink-faint ml-auto">{s.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function OverviewCharts({ jobs }) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      <WeeklyBarChart jobs={jobs} />
      <StatusDonut jobs={jobs} />
    </div>
  )
}
