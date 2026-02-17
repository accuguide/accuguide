interface AboutContainerProps {
  children: React.ReactNode
}

export default function AboutContainer({ children }: AboutContainerProps) {
  return (
    <div className="about-container">
      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  )
}
