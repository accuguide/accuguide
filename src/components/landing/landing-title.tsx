export default function LandingTitle() {
  return (
    <div className="text-center">
      <h1 className="md:text-6xl">
        Discover accessibility with{" "}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ef4444, #facc15, #ffffff, #3b82f6, #22c55e)",
          }}
        >
          Accuguide
        </span>
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-10">
        Accuguide makes it easy to find accessible places, review accessibility
        features, and share your experiences with the community. Start by
        searching for places or services like restaurants, schools, or airlines!
      </p>
    </div>
  );
}
