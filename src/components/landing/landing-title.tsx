export default function LandingTitle() {
  return (
    <div className="text-center">
      <h1 className="md:text-6xl">
        Discover accessibility with{' '}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ef4444, #facc15, #ffffff, #3b82f6, #22c55e)',
          }}
        >
          Accuguide
        </span>
      </h1>
      <p className="mx-auto mb-6 max-w-2xl text-lg leading-relaxed sm:mb-10 md:text-xl">
        Accuguide makes it easy to find accessible places, review accessibility
        features, and share your experiences with the community. Start by
        searching for places or services like restaurants, schools, or airlines!
      </p>
    </div>
  )
}
