'use client'

import Image from 'next/image'
import Heading from '../Heading'
import { HeartButton } from '../HeartButton'
import useCountries from '@/app/hooks/useCountries'
import type { SafeUser } from '@/app/types'

interface ListingHeadProps {
  title: string
  locationValue: string
  imageSrc: string
  id: string
  currentUser?: SafeUser | null
}

export const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries()
  const location = getByValue(locationValue)

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="
          relative
          h-[60vh]
          w-full
          overflow-hidden
          rounded-xl
        "
      >
        <Image
          src={imageSrc}
          fill
          className="w-full object-cover"
          alt="Image"
        />
        <div
          className="
            absolute
            right-5
            top-5
          "
        >
          <HeartButton
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  )
}
