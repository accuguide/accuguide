export default function LandingTitle() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance text-slate-900 dark:text-slate-100 sm:text-7xl">
        Discover accessibility with{' '}
        <span
          className="bg-clip-text text-transparent animate-gradient"
          style={{
            backgroundImage:
              'linear-gradient(135deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6)',
          }}
        >
          Accuguide
        </span>
      </h1>

      <p className="mt-8 text-base md:text-lg font-medium text-pretty text-slate-600 dark:text-slate-300 sm:text-xl/8">
        Accuguide makes it easy to find accessible places, review accessibility
        features, and share your experiences with the community. Get started by
        searching for a location to explore detailed accessibility information
        or add your own review.
      </p>
    </div>
  )
}
