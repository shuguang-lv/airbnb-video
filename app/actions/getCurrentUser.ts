import { getServerSession } from 'next-auth'

import prisma from '@/app/libs/prismadb'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export async function getSession() {
  return getServerSession(authOptions)
}

export default async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user?.email)
      return null

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!currentUser)
      return null

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      emailVerified: currentUser?.emailVerified?.toISOString() || null,
      updatedAt: currentUser.updatedAt.toISOString(),
    }
  }
  catch (error) {
    return null
  }
}
