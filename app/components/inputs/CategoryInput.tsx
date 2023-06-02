'use client'

import React from 'react'
import type { IconType } from 'react-icons'

interface CategoryInputProps {
  icon: IconType
  label: string
  selected?: boolean
  onClick: (value: string) => void
}

export const CategoryInput: React.FC<CategoryInputProps> = ({ icon: Icon, label, selected, onClick }) => (
    <div
      className={`
        flex
        cursor-pointer
        flex-col
        gap-3
        rounded-xl
        border-2
        p-4
        transition
        hover:border-black
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
      onClick={() => onClick(label)}
    >
      <Icon size={30} />
      <div className="font-semibold">
        {label}
      </div>
    </div>
)
