export default function BigHead({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div>
      <h1 className="big-title">{title}</h1>
      <p className="big-subtitle">{subtitle}</p>
    </div>
  )
}
