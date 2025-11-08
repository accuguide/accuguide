import Image from 'next/image'

interface TeamMemberProps {
  name: string
  role: string
  imageUrl: string
}

export default function TeamMember({ name, role, imageUrl }: TeamMemberProps) {
  return (
    <li>
      <Image
        alt=""
        src={imageUrl}
        width={96}
        height={96}
        className="mx-auto h-24 w-24 rounded-lg object-cover"
      />
      <h3 className="wrap-break-word mt-6 text-base tracking-tight">{name}</h3>
      <p className="wrap-break-word text-sm">{role}</p>
    </li>
  )
}
