'use client'

import { useState } from 'react'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import Button from '../Button'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Modal from './Modal'
import useRegisterModal from '@/app/hooks/useRegisterModal'

function RegisterModal() {
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    try {
      await axios.post('/api/register', data)
      registerModal.onClose()
    }
    catch (error) {
      toast.error(`${error}`)
    }
    finally {
      setIsLoading(false)
    }
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading subtitle="Create an account" title="Welcome to Airbnb" />
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
        id="name"
        label="Name"
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
          <div>Already have an account?</div>
          <div
            className="cursor-pointer text-neutral-800 hover:underline"
            onClick={registerModal.onClose}
          >
            Log in
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
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
    />
  )
}

export default RegisterModal
