export default function WishlistGrid({ jobs, onOpen, onMarkApplied, applyingId }) {
  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-surface-border shadow-card py-16 text-center">
        <p className="text-ink-soft text-sm">
          Belum ada lowongan yang diincar. Tambah dulu yang menarik perhatianmu.
        </p>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job) => {
        const isApplying = applyingId === job.id
        return (
          <div
            key={job.id}
            className="bg-white rounded-2xl border border-surface-border shadow-card p-4 flex flex-col"
          >
            <div className="flex-1 cursor-pointer" onClick={() => onOpen(job)}>
              <p className="font-semibold text-ink">{job.company}</p>
              <p className="text-sm text-ink-soft mt-0.5">{job.position}</p>
              {job.location && <p className="text-xs text-ink-faint mt-2">{job.location}</p>}
              {job.notes && (
                <p className="text-xs text-ink-faint mt-2 line-clamp-2">{job.notes}</p>
              )}
            </div>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-surface-border">
              <button
                onClick={() => onMarkApplied(job.id)}
                disabled={isApplying}
                className="flex-1 bg-brand-light text-brand text-xs font-semibold rounded-lg px-3 py-2 hover:bg-brand hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isApplying ? 'Menandai…' : 'Tandai sudah apply'}
              </button>
              <button
                onClick={() => onOpen(job)}
                disabled={isApplying}
                className="text-ink-faint hover:text-ink text-xs font-medium px-2 py-2 disabled:opacity-60"
              >
                Ubah
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
