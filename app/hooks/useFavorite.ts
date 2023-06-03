import axios from 'axios'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import type { SafeUser } from '../types'
import useLoginModal from './useLoginModal'

interface IUseFavorite {
  listingId: string
  currentUser?: SafeUser | null
}

function useFavorite({ listingId, currentUser }: IUseFavorite) {
  const router = useRouter()
  const loginModel = useLoginModal()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || []
    return list.includes(listingId)
  }, [currentUser, listingId])

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (!currentUser)
      return loginModel.onOpen()
    try {
      let request
      if (hasFavorited)
        request = () => axios.delete(`/api/favorites/${listingId}`)
      else
        request = () => axios.post(`/api/favorites/${listingId}`)

      await request()
      router.refresh()
      toast.success('Success')
    }
    catch (error) {
      toast.error('Something went wrong')
    }
  }, [currentUser, hasFavorited, listingId, loginModel, router])

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite
