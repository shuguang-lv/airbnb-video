'use client'

import Image from 'next/image'

function Avatar() {
  return (
    <Image
      alt="avatar"
      className="rounded-full"
      height="30"
      width="30"
      src="/images/placeholder.jpg"
    />
  )
}

export default Avatar
