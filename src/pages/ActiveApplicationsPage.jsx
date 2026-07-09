import { STATUSES } from '../data/statuses'
import ApplicationsTable from '../components/ApplicationsTable'

const ACTIVE_STATUSES = STATUSES.filter((s) => s.id !== 'wishlist')

export default function ActiveApplicationsPage({ jobs, onOpen, statusFilter, onStatusFilterChange }) {
  const activeJobs = jobs.filter((j) => j.status !== 'wishlist')

  return (
    <>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-ink">Lamaran Aktif</h1>
        <p className="text-sm text-ink-soft mt-1">
          Semua lowongan yang sudah kamu kirim lamarannya, dari applied sampai closed.
        </p>
      </div>
      <ApplicationsTable
        jobs={activeJobs}
        onOpen={onOpen}
        statusFilter={statusFilter}
        onStatusFilterChange={onStatusFilterChange}
        statuses={ACTIVE_STATUSES}
        title="Lamaran terkirim"
      />
    </>
  )
}
