'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import useLoginModal from '../../hooks/useLoginModal'
import Button from '../Button'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Modal from './Modal'
import useRegisterModal from '@/app/hooks/useRegisterModal'

function LoginModal() {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    try {
      const callback = await signIn('credentials', {
        ...data,
        redirect: false,
      })

      setIsLoading(false)
      if (callback?.ok) {
        toast('Logged in successfully', { icon: '👏' })
        router.refresh()
        loginModal.onClose()
      }
      if (callback?.error)
        toast.error(`${callback.error}`)
    }
    catch (error) {}
  }

  const toggle = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading subtitle="Login to your account" title="Welcome back" />
      <Input
        disabled={isLoading}
        errors={errors}
        id="email"
        label="Email"
        register={register}
        required
      />
      <Input
        disabled={isLoading}
        errors={errors}
        id="password"
        label="Password"
        register={register}
        required
        type="password"
      />
    </div>
  )

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button
        icon={FcGoogle}
        label="Continue with Google"
        onClick={() => signIn('google')}
        outline
      />
      <Button
        icon={AiFillGithub}
        label="Continue with GitHub"
        onClick={() => signIn('github')}
        outline
      />
      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>First time using Airbnb?</div>
          <div
            className="cursor-pointer text-neutral-800 hover:underline"
            onClick={toggle}
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      actionLabel="Continue"
      body={bodyContent}
      disabled={isLoading}
      footer={footerContent}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Login"
    />
  )
}

export default LoginModal
