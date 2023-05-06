"use client"

import Image from "next/image"

interface AvatarProps {
  src: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({ src }) => (
  <Image
    alt="avatar"
    className="rounded-full"
    height="30"
    src={src || "/images/placeholder.jpg"}
    width="30"
  />
)

export default Avatar
