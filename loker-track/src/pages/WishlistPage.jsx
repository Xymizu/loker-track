import WishlistGrid from '../components/WishlistGrid'

export default function WishlistPage({ jobs, onOpen, onMarkApplied, applyingId }) {
  const wishlistJobs = jobs.filter((j) => j.status === 'wishlist')

  return (
    <>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-ink">Wishlist</h1>
        <p className="text-sm text-ink-soft mt-1">
          Lowongan yang mau kamu lamar. Tandai "sudah apply" begitu lamaran terkirim.
        </p>
      </div>
      <WishlistGrid
        jobs={wishlistJobs}
        onOpen={onOpen}
        onMarkApplied={onMarkApplied}
        applyingId={applyingId}
      />
    </>
  )
}
