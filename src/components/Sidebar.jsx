const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
  { id: 'active', label: 'Lamaran Aktif', icon: BriefcaseIcon },
  { id: 'wishlist', label: 'Wishlist', icon: BookmarkIcon },
]

export default function Sidebar({ activeView, onViewChange, jobs }) {
  const activeCount = jobs.filter((j) =>
    ['applied', 'screening', 'interview'].includes(j.status),
  ).length
  const wishlistCount = jobs.filter((j) => j.status === 'wishlist').length
  const counts = { dashboard: jobs.length, active: activeCount, wishlist: wishlistCount }

  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 bg-white border-r border-surface-border h-screen sticky top-0">
      <div className="flex items-center gap-2 px-5 h-16 border-b border-surface-border">
        <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
          <span className="text-white font-bold text-sm">L</span>
        </div>
        <span className="font-bold text-[15px] text-ink">LokerTrack</span>
      </div>

      <nav className="flex-1 px-3 py-5">
        <p className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
          Menu
        </p>
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = activeView === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-brand-light text-brand'
                      : 'text-ink-soft hover:bg-surface hover:text-ink'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <item.icon className={`w-[18px] h-[18px] ${active ? 'text-brand' : 'text-ink-faint'}`} />
                    {item.label}
                  </span>
                  {item.id !== 'dashboard' && counts[item.id] > 0 && (
                    <span
                      className={`text-xs rounded-full px-1.5 py-0.5 font-semibold ${
                        active ? 'bg-brand text-white' : 'bg-surface text-ink-soft'
                      }`}
                    >
                      {counts[item.id]}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-3 border-t border-surface-border">
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-surface">
          <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand font-semibold text-xs">
            RI
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink truncate">Ri</p>
            <p className="text-xs text-ink-faint truncate">Pencari kerja</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

function HomeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BriefcaseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" />
      <path d="M3 12h18" />
    </svg>
  )
}

function BookmarkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
