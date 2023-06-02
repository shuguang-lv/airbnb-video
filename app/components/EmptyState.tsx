'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import Button from './Button'
import Heading from './Heading'

interface EmptyStateProps {
  title?: string
  subtitle?: string
  showReset?: boolean
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters',
  showReset,
}) => {
  const router = useRouter()

  return (
    <div
      className="
        flex
        h-[60vh]
        flex-col
        items-center
        justify-center
        gap-2
      "
    >
      <Heading
        center
        subtitle={subtitle}
        title={title}
      />
      <div className="mt-4 w-48">
        {showReset
          ? <Button
          label="Remove all filters"
          onClick={() => router.push('/')}
          outline
                     />
          : null}
      </div>
    </div>
  )
}
