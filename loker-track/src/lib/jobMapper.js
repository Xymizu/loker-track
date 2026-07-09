export function fromApi(job) {
  return {
    id: job.id,
    company: job.company,
    position: job.position,
    location: job.location || '',
    source: job.source || '',
    link: job.link || '',
    appliedDate: job.applied_date || '',
    salary: job.salary || '',
    notes: job.notes || '',
    status: job.status,
    updatedAt: job.updated_at,
  }
}

export function toApi(job) {
  return {
    company: job.company,
    position: job.position,
    location: job.location || '',
    source: job.source || '',
    link: job.link || '',
    applied_date: job.appliedDate || '',
    salary: job.salary || '',
    notes: job.notes || '',
    status: job.status,
  }
}
