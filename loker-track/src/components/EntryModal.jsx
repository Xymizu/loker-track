import { useEffect, useState } from 'react'
import { STATUSES } from '../data/statuses'

const EMPTY = {
  company: '',
  position: '',
  location: '',
  source: '',
  link: '',
  appliedDate: '',
  salary: '',
  notes: '',
  status: 'wishlist',
}

export default function EntryModal({ job, onClose, onSave, onDelete }) {
  const [form, setForm] = useState(EMPTY)
  const [formError, setFormError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const busy = submitting || deleting

  useEffect(() => {
    setForm(job ? { ...EMPTY, ...job } : EMPTY)
    setFormError(null)
  }, [job])

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.company.trim() || !form.position.trim()) {
      setFormError('Perusahaan dan posisi wajib diisi.')
      return
    }
    setFormError(null)
    setSubmitting(true)
    try {
      await onSave(form)
      // onSave closes the modal on success; if it didn't throw but also
      // didn't close (shouldn't happen), we still stop the spinner below.
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan lamaran. Coba lagi.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDeleteClick() {
    setFormError(null)
    setDeleting(true)
    try {
      await onDelete(job.id)
    } catch (err) {
      setFormError(err.message || 'Gagal menghapus lamaran. Coba lagi.')
      setDeleting(false)
    }
  }

  function handleBackdropClick() {
    if (!busy) onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-ink/40 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-md shadow-card-hover max-h-[90vh] overflow-y-auto"
      >
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-ink text-lg">
              {job ? 'Ubah lamaran' : 'Lamaran baru'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              disabled={busy}
              aria-label="Tutup"
              className="text-ink-faint hover:text-ink w-8 h-8 rounded-lg hover:bg-surface grid place-items-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ✕
            </button>
          </div>

          {formError && (
            <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2">
              <p className="text-sm text-rose-700">{formError}</p>
            </div>
          )}

          <div className="space-y-3.5">
            <Field label="Perusahaan">
              <input
                required
                value={form.company}
                onChange={set('company')}
                disabled={busy}
                className="field-input"
                placeholder="mis. Nusantara Digital"
              />
            </Field>

            <Field label="Posisi">
              <input
                required
                value={form.position}
                onChange={set('position')}
                disabled={busy}
                className="field-input"
                placeholder="mis. Frontend Engineer"
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Lokasi">
                <input
                  value={form.location}
                  onChange={set('location')}
                  disabled={busy}
                  className="field-input"
                />
              </Field>
              <Field label="Sumber info">
                <input
                  value={form.source}
                  onChange={set('source')}
                  disabled={busy}
                  className="field-input"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Tanggal lamar">
                <input
                  type="date"
                  value={form.appliedDate}
                  onChange={set('appliedDate')}
                  disabled={busy}
                  className="field-input"
                />
              </Field>
              <Field label="Gaji ditawarkan">
                <input
                  value={form.salary}
                  onChange={set('salary')}
                  disabled={busy}
                  className="field-input"
                />
              </Field>
            </div>

            <Field label="Tautan lowongan">
              <input
                value={form.link}
                onChange={set('link')}
                disabled={busy}
                className="field-input"
              />
            </Field>

            <Field label="Status">
              <select
                value={form.status}
                onChange={set('status')}
                disabled={busy}
                className="field-input"
              >
                {STATUSES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Catatan">
              <textarea
                value={form.notes}
                onChange={set('notes')}
                disabled={busy}
                rows={3}
                className="field-input resize-none"
                placeholder="Kontak HR, hasil interview, dll."
              />
            </Field>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-surface-border">
            {job ? (
              <button
                type="button"
                onClick={handleDeleteClick}
                disabled={busy}
                className="text-sm font-medium text-rose-600 hover:text-rose-700 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {deleting ? 'Menghapus…' : 'Hapus lamaran'}
              </button>
            ) : (
              <span />
            )}
            <button
              type="submit"
              disabled={busy}
              className="bg-brand hover:bg-brand-dark text-white text-sm font-semibold rounded-lg px-5 py-2.5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Menyimpan…' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-ink-soft mb-1.5">{label}</span>
      {children}
    </label>
  )
}
