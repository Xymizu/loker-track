export default function StatsRow({ jobs }) {
  const total = jobs.length
  const active = jobs.filter((j) =>
    ['applied', 'screening', 'interview'].includes(j.status),
  ).length
  const interview = jobs.filter((j) => j.status === 'interview').length
  const offer = jobs.filter((j) => j.status === 'offer').length

  const cards = [
    {
      label: 'Total lamaran',
      value: total,
      note: 'sejak mulai melacak',
      icon: FolderIcon,
      tint: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Dalam proses',
      value: active,
      note: 'butuh tindak lanjut',
      icon: ClockIcon,
      tint: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'Interview',
      value: interview,
      note: 'siap-siap wawancara',
      icon: ChatIcon,
      tint: 'bg-violet-50 text-violet-600',
    },
    {
      label: 'Tawaran',
      value: offer,
      note: 'tinggal negosiasi',
      icon: CheckIcon,
      tint: 'bg-emerald-50 text-emerald-600',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-white rounded-2xl border border-surface-border p-4 shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${c.tint}`}>
              <c.icon className="w-[18px] h-[18px]" />
            </span>
          </div>
          <p className="text-2xl font-bold text-ink">{c.value}</p>
          <p className="text-sm text-ink-soft mt-0.5">{c.label}</p>
          <p className="text-xs text-ink-faint mt-1">{c.note}</p>
        </div>
      ))}
    </div>
  )
}

function FolderIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" strokeLinejoin="round" />
    </svg>
  )
}
function ClockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ChatIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-4-1L3 20l1.2-3.6a8.4 8.4 0 0 1-1.2-4.4A8.38 8.38 0 0 1 11.5 3 8.5 8.5 0 0 1 21 11.5Z" strokeLinejoin="round" />
    </svg>
  )
}
function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
