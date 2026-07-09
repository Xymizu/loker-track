export default function Topbar({ query, onQueryChange, onNewEntry, pageLabel }) {
  return (
    <div className="flex items-center justify-between h-16 px-4 md:px-8 border-b border-surface-border bg-white sticky top-0 z-10">
      <div className="text-sm text-ink-faint">
        Halaman <span className="text-ink-soft">/</span>{' '}
        <span className="text-ink font-medium">{pageLabel}</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <SearchIcon className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Cari perusahaan atau posisi…"
            aria-label="Cari lamaran"
            className="w-64 bg-surface border border-surface-border rounded-lg pl-9 pr-3 py-2 text-sm placeholder:text-ink-faint focus:bg-white focus:border-brand outline-none"
          />
        </div>

        <button
          onClick={onNewEntry}
          className="bg-brand hover:bg-brand-dark text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors"
        >
          + Entri baru
        </button>

        <div className="w-9 h-9 rounded-full bg-brand-light flex items-center justify-center text-brand font-semibold text-xs">
          RI
        </div>
      </div>
    </div>
  )
}

function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" strokeLinecap="round" />
    </svg>
  )
}
