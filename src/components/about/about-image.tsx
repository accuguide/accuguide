interface AboutImageProps {
  src: string
  alt: string
}

export default function AboutImage({ src, alt }: AboutImageProps) {
  return (
    <div className="relative w-40">
      <img
        alt={alt}
        src={src}
        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg dark:bg-gray-700/5"
      />
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
    </div>
  )
}
