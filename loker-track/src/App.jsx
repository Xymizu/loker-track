import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import EntryModal from './components/EntryModal'
import DashboardPage from './pages/DashboardPage'
import ActiveApplicationsPage from './pages/ActiveApplicationsPage'
import WishlistPage from './pages/WishlistPage'
import { useJobs } from './hooks/useJobs'

const PAGE_LABELS = {
  '/': 'Dashboard',
  '/active': 'Lamaran Aktif',
  '/wishlist': 'Wishlist',
}

export default function App() {
  const { jobs, loading, error, addJob, updateJob, deleteJob, refresh } = useJobs()
  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [activeJob, setActiveJob] = useState(null)
  const [toast, setToast] = useState(null)
  const [applyingId, setApplyingId] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const statusFilter = searchParams.get('status') || 'all'

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(t)
  }, [toast])

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

  // These are passed into EntryModal, which awaits them and shows any
  // thrown error inline (inside the modal, not hidden behind it).
  async function handleSave(form) {
    if (activeJob) {
      await updateJob(activeJob.id, form)
    } else {
      await addJob(form)
    }
    setModalOpen(false)
  }

  async function handleDelete(id) {
    await deleteJob(id)
    setModalOpen(false)
  }

  async function handleMarkApplied(id) {
    setApplyingId(id)
    try {
      await updateJob(id, {
        status: 'applied',
        appliedDate: new Date().toISOString().slice(0, 10),
      })
    } catch (err) {
      setToast(err.message || 'Gagal menandai lamaran sebagai applied.')
    } finally {
      setApplyingId(null)
    }
  }

  function goToActive() {
    navigate('/active')
  }

  function goToActiveWithFilter(status) {
    navigate(`/active?status=${status}`)
  }

  function handleStatusFilterChange(status) {
    setSearchParams(status === 'all' ? {} : { status })
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar jobs={jobs} />

      <div className="flex-1 min-w-0">
        <Topbar
          query={query}
          onQueryChange={setQuery}
          onNewEntry={openNew}
          pageLabel={PAGE_LABELS[location.pathname] || 'Dashboard'}
        />

        <main className="px-4 md:px-8 py-6 max-w-6xl mx-auto">
          {error && (
            <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
              <p className="text-sm text-rose-700">{error}</p>
              <button
                onClick={refresh}
                className="text-sm font-semibold text-rose-700 hover:text-rose-800 shrink-0"
              >
                Coba lagi
              </button>
            </div>
          )}

          {loading ? (
            <div className="py-24 text-center text-sm text-ink-faint">Memuat data…</div>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <DashboardPage
                    jobs={searched}
                    onOpen={openExisting}
                    onGoToActive={goToActive}
                    onGoToInterviews={goToActiveWithFilter}
                  />
                }
              />
              <Route
                path="/active"
                element={
                  <ActiveApplicationsPage
                    jobs={searched}
                    onOpen={openExisting}
                    statusFilter={statusFilter}
                    onStatusFilterChange={handleStatusFilterChange}
                  />
                }
              />
              <Route
                path="/wishlist"
                element={
                  <WishlistPage
                    jobs={searched}
                    onOpen={openExisting}
                    onMarkApplied={handleMarkApplied}
                    applyingId={applyingId}
                  />
                }
              />
            </Routes>
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

      {toast && (
        <div className="fixed top-4 right-4 z-[60] rounded-lg border border-rose-200 bg-white shadow-card-hover px-4 py-3 max-w-sm">
          <p className="text-sm text-rose-700">{toast}</p>
        </div>
      )}
    </div>
  )
}
