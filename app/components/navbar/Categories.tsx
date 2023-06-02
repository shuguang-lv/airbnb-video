'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import { BsSnow } from 'react-icons/bs'
import { FaSkiing } from 'react-icons/fa'
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi'
import { IoDiamond } from 'react-icons/io5'
import { MdOutlineVilla } from 'react-icons/md'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'

import CategoryBox from '../CategoryBox'
import Container from '../Container'

export const categories = [
  {
    description: 'This property is close to the beach!',
    icon: TbBeach,
    label: 'Beach',
  },
  {
    description: 'This property is has windmills!',
    icon: GiWindmill,
    label: 'Windmills',
  },
  {
    description: 'This property is modern!',
    icon: MdOutlineVilla,
    label: 'Modern',
  },
  {
    description: 'This property is in the countryside!',
    icon: TbMountain,
    label: 'Countryside',
  },
  {
    description: 'This is property has a beautiful pool!',
    icon: TbPool,
    label: 'Pools',
  },
  {
    description: 'This property is on an island!',
    icon: GiIsland,
    label: 'Islands',
  },
  {
    description: 'This property is near a lake!',
    icon: GiBoatFishing,
    label: 'Lake',
  },
  {
    description: 'This property has skiing activies!',
    icon: FaSkiing,
    label: 'Skiing',
  },
  {
    description: 'This property is an ancient castle!',
    icon: GiCastle,
    label: 'Castles',
  },
  {
    description: 'This property is in a spooky cave!',
    icon: GiCaveEntrance,
    label: 'Caves',
  },
  {
    description: 'This property offers camping activities!',
    icon: GiForestCamp,
    label: 'Camping',
  },
  {
    description: 'This property is in arctic environment!',
    icon: BsSnow,
    label: 'Arctic',
  },
  {
    description: 'This property is in the desert!',
    icon: GiCactus,
    label: 'Desert',
  },
  {
    description: 'This property is in a barn!',
    icon: GiBarn,
    label: 'Barns',
  },
  {
    description: 'This property is brand new and luxurious!',
    icon: IoDiamond,
    label: 'Lux',
  },
]

export default function Categories() {
  const params = useSearchParams()
  const category = params?.get('category')
  const pathname = usePathname()

  const isMainPage = pathname === '/'

  if (!isMainPage)
    return null

  return (
    <Container>
      <div className="flex flex-row items-center justify-between overflow-x-auto pt-4">
        {categories.map(item => (
          <CategoryBox icon={item.icon} key={item.label} label={item.label} selected={category === item.label} />
        ))}
      </div>
    </Container>
  )
}
