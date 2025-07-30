export default function LandingTitle() {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
        Discover accessibility with{' '}
        <span
          className="bg-clip-text text-transparent animate-gradient"
          style={{
            backgroundImage:
              'linear-gradient(45deg, #ef4444, #f97316, #facc15, #22c55e, #3b82f6, #8b5cf6)',
            backgroundSize: '300% 300%',
          }}
        >
          Accuguide
        </span>
      </h1>
      <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl lg:text-2xl">
        Accuguide makes it easy to find accessible places, review accessibility
        features, and share your experiences with the community. Start by
        searching for places or services like restaurants, schools, or airlines!
      </p>
    </div>
  )
}
