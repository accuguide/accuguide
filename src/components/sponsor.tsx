import Image from 'next/image'

interface SponsorProps {
  name: string
  imageUrl: string
}

export default function Sponsor({ name, imageUrl }: SponsorProps) {
  return (
    <li>
      <Image
        alt={`${name} logo`}
        src={imageUrl}
        width={96}
        height={96}
        className="mx-auto h-24 w-24 rounded-lg object-cover"
      />
      <h3 className="wrap-break-word mt-6 text-base tracking-tight">{name}</h3>
    </li>
  )
}
