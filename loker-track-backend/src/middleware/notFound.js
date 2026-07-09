export function notFound(req, res, next) {
  res.status(404).json({
    error: `Rute tidak ditemukan: ${req.method} ${req.originalUrl}`,
  })
}
