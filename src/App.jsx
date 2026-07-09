import { useMemo, useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import EntryModal from './components/EntryModal'
import DashboardPage from './pages/DashboardPage'
import ActiveApplicationsPage from './pages/ActiveApplicationsPage'
import WishlistPage from './pages/WishlistPage'
import { useJobs } from './hooks/useJobs'

const PAGE_LABELS = {
  dashboard: 'Dashboard',
  active: 'Lamaran Aktif',
  wishlist: 'Wishlist',
}

export default function App() {
  const { jobs, addJob, updateJob, deleteJob } = useJobs()
  const [query, setQuery] = useState('')
  const [view, setView] = useState('dashboard')
  const [statusFilter, setStatusFilter] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [activeJob, setActiveJob] = useState(null)

  const searched = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return jobs
    return jobs.filter(
      (j) => j.company.toLowerCase().includes(q) || j.position.toLowerCase().includes(q),
    )
  }, [jobs, query])

  function openNew() {
    setActiveJob(null)
    setModalOpen(true)
  }

  function openExisting(job) {
    setActiveJob(job)
    setModalOpen(true)
  }

  function handleSave(form) {
    if (activeJob) {
      updateJob(activeJob.id, form)
    } else {
      addJob(form)
    }
    setModalOpen(false)
  }

  function handleDelete(id) {
    deleteJob(id)
    setModalOpen(false)
  }

  function goToActive() {
    setView('active')
    setStatusFilter('all')
  }

  function goToActiveWithFilter(status) {
    setView('active')
    setStatusFilter(status)
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar activeView={view} onViewChange={setView} jobs={jobs} />

      <div className="flex-1 min-w-0">
        <Topbar
          query={query}
          onQueryChange={setQuery}
          onNewEntry={openNew}
          pageLabel={PAGE_LABELS[view]}
        />

        <main className="px-4 md:px-8 py-6 max-w-6xl mx-auto">
          {view === 'dashboard' && (
            <DashboardPage
              jobs={searched}
              onOpen={openExisting}
              onGoToActive={goToActive}
              onGoToInterviews={goToActiveWithFilter}
            />
          )}

          {view === 'active' && (
            <ActiveApplicationsPage
              jobs={searched}
              onOpen={openExisting}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />
          )}

          {view === 'wishlist' && (
            <WishlistPage
              jobs={searched}
              onOpen={openExisting}
              onMarkApplied={(id) =>
                updateJob(id, { status: 'applied', appliedDate: new Date().toISOString().slice(0, 10) })
              }
            />
          )}
        </main>
      </div>

      {modalOpen && (
        <EntryModal
          job={activeJob}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
