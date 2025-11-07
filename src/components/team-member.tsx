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
      <h3 className="mt-6 text-base tracking-tight wrap-break-word">{name}</h3>
      <p className="text-sm wrap-break-word">{role}</p>
    </li>
  )
}
