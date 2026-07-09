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

  useEffect(() => {
    setForm(job ? { ...EMPTY, ...job } : EMPTY)
  }, [job])

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.company.trim() || !form.position.trim()) return
    onSave(form)
  }

  return (
    <div
      className="fixed inset-0 bg-ink/40 flex items-center justify-center p-4 z-50"
      onClick={onClose}
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
              aria-label="Tutup"
              className="text-ink-faint hover:text-ink w-8 h-8 rounded-lg hover:bg-surface grid place-items-center"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3.5">
            <Field label="Perusahaan">
              <input
                required
                value={form.company}
                onChange={set('company')}
                className="field-input"
                placeholder="mis. Nusantara Digital"
              />
            </Field>

            <Field label="Posisi">
              <input
                required
                value={form.position}
                onChange={set('position')}
                className="field-input"
                placeholder="mis. Frontend Engineer"
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Lokasi">
                <input value={form.location} onChange={set('location')} className="field-input" />
              </Field>
              <Field label="Sumber info">
                <input value={form.source} onChange={set('source')} className="field-input" />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Tanggal lamar">
                <input
                  type="date"
                  value={form.appliedDate}
                  onChange={set('appliedDate')}
                  className="field-input"
                />
              </Field>
              <Field label="Gaji ditawarkan">
                <input value={form.salary} onChange={set('salary')} className="field-input" />
              </Field>
            </div>

            <Field label="Tautan lowongan">
              <input value={form.link} onChange={set('link')} className="field-input" />
            </Field>

            <Field label="Status">
              <select value={form.status} onChange={set('status')} className="field-input">
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
                onClick={() => onDelete(job.id)}
                className="text-sm font-medium text-rose-600 hover:text-rose-700"
              >
                Hapus lamaran
              </button>
            ) : (
              <span />
            )}
            <button
              type="submit"
              className="bg-brand hover:bg-brand-dark text-white text-sm font-semibold rounded-lg px-5 py-2.5 transition-colors"
            >
              Simpan
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
