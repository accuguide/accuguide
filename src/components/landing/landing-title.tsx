export default function LandingTitle() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h1
        className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance"
        style={{
          backgroundImage:
            'linear-gradient(135deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6)',
        }}
      >
        Discover Accessibility
      </h1>

      <p className="mt-8 text-base md:text-lg font-bold text-pretty text-slate-600 dark:text-slate-300 sm:text-xl/8">
        Accuguide makes it easy to find accessible places, review accessibility
        features, and share your experiences with the community. Get started by
        searching for a location to explore detailed accessibility information
        or add your own review.
      </p>
    </div>
  )
}
