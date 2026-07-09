export default function PromoBanner({ jobs, onViewStatus }) {
  const interviewCount = jobs.filter((j) => j.status === 'interview').length
  const screeningCount = jobs.filter((j) => j.status === 'screening').length

  const relevantStatus = interviewCount > 0 ? 'interview' : screeningCount > 0 ? 'screening' : 'all'
  const message =
    interviewCount > 0
      ? `${interviewCount} lamaran sedang tahap interview. Siapkan bahan wawancaramu.`
      : screeningCount > 0
        ? `${screeningCount} lamaran sedang diproses HR. Saatnya follow up sopan.`
        : 'Belum ada lamaran yang berjalan. Tambah entri baru untuk mulai melacak.'

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand to-violet-500 px-6 py-5 md:px-8 md:py-6 mb-6">
      <div className="relative z-10 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
            <SparkIcon className="w-4 h-4 text-white" />
          </span>
          <div>
            <p className="text-white/70 text-xs font-medium uppercase tracking-wide">
              Ringkasan minggu ini
            </p>
            <p className="text-white font-medium">{message}</p>
          </div>
        </div>
        <button
          onClick={() => onViewStatus(relevantStatus)}
          className="bg-white text-brand text-sm font-semibold rounded-lg px-4 py-2 hover:bg-white/90 transition-colors shrink-0"
        >
          Lihat detail
        </button>
      </div>
      <div className="absolute -right-8 -top-10 w-40 h-40 rounded-full bg-white/10" />
      <div className="absolute right-16 -bottom-16 w-32 h-32 rounded-full bg-white/10" />
    </div>
  )
}

function SparkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2 14 9 21 11 14 13 12 20 10 13 3 11 10 9Z" />
    </svg>
  )
}
