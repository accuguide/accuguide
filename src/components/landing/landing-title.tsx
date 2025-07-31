export default function LandingTitle() {
  return (
    <div className="space-y-6 text-center">
      <h1 className="text-4xl font-bold leading-tight text-slate-900 dark:text-slate-100 sm:text-5xl md:text-6xl lg:text-7xl">
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

      <p className="mx-auto max-w-3xl text-lg leading-tight text-slate-600 dark:text-slate-300 sm:text-xl md:text-2xl">
        Accuguide makes it easy to find accessible places, review accessibility
        features, and share your experiences with the community.
      </p>

      <p className="mx-auto max-w-2xl text-base text-slate-500 dark:text-slate-400 sm:text-lg">
        Start by searching for places or services like restaurants, schools, or
        airlines!
      </p>
    </div>
  )
}
