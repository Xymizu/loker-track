import { useEffect, useState } from 'react'
import { SEED_JOBS } from '../data/seedJobs'

const STORAGE_KEY = 'case-file:jobs'

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (err) {
    console.warn('Tidak bisa membaca data tersimpan, memakai contoh data.', err)
  }
  return SEED_JOBS
}

export function useJobs() {
  const [jobs, setJobs] = useState(loadInitial)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
    } catch (err) {
      console.warn('Tidak bisa menyimpan data.', err)
    }
  }, [jobs])

  function addJob(job) {
    setJobs((prev) => [
      { ...job, id: crypto.randomUUID(), updatedAt: new Date().toISOString().slice(0, 10) },
      ...prev,
    ])
  }

  function updateJob(id, patch) {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === id
          ? { ...j, ...patch, updatedAt: new Date().toISOString().slice(0, 10) }
          : j,
      ),
    )
  }

  function moveJob(id, status) {
    updateJob(id, { status })
  }

  function deleteJob(id) {
    setJobs((prev) => prev.filter((j) => j.id !== id))
  }

  return { jobs, addJob, updateJob, moveJob, deleteJob }
}
