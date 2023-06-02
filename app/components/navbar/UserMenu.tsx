'use client'

import { signOut } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

import useLoginModal from '../../hooks/useLoginModal'
import type { SafeUser } from '../../types/index'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import useRentModal from '@/app/hooks/useRentModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen(value => !value)
  }, [])

  const onRent = useCallback(() => {
    if (!currentUser)
      return loginModal.onOpen()

    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
          onClick={onRent}
        >
          Airbnb your home
        </div>
        <div
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 py-4 transition hover:shadow-md md:px-2 md:py-1"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen
        ? (
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            {currentUser
              ? (
              <>
                <MenuItem label="My trips" onClick={() => {}} />
                <MenuItem label="My favorites" onClick={() => {}} />
                <MenuItem label="My reservations" onClick={() => {}} />
                <MenuItem label="My properties" onClick={() => {}} />
                <MenuItem label="Airbnb my home" onClick={rentModal.onOpen} />
                <hr />
                <MenuItem label="Logout" onClick={signOut} />
              </>
                )
              : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
                )}
          </div>
        </div>
          )
        : null}
    </div>
  )
}

export default UserMenu
