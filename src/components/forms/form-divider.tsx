export default function FormDivider({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 border-t" />
      <span className="secondary-text mt-0 text-sm">{text}</span>
      <div className="flex-1 border-t" />
    </div>
  )
}
