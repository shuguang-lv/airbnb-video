'use client'

import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import Heading from '../Heading'
import { CategoryInput } from '../inputs/CategoryInput'
import { Counter } from '../inputs/Counter'
import { CountrySelect } from '../inputs/CountrySelect'
import { ImageUpload } from '../inputs/ImageUpload'
import Input from '../inputs/Input'
import { categories } from '../navbar/Categories'
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal'

enum STEPS {
  CATEGORY,
  LOCATION,
  INFO,
  IMAGES,
  DESCRIPTION,
  PRICE,
}

export function RentModal() {
  const router = useRouter()
  const rentModal = useRentModal()
  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE)
      return 'Create'

    return 'Next'
  }, [step])
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY)
      return undefined

    return 'Back'
  }, [step])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      bathroomCount: 1,
      category: '',
      description: '',
      guestCount: 1,
      imageSrc: '',
      location: null,
      price: 1,
      roomCount: 1,
      title: '',
    },
  })

  const onBack = () => setStep(value => value - 1)
  const onNext = () => setStep(value => value + 1)
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE)
      return onNext()

    setIsLoading(true)
    try {
      await axios.post('/api/listings', data)
      toast.success('Listing Created!')
      router.refresh()
      reset()
      setStep(STEPS.CATEGORY)
      rentModal.onClose()
    }
    catch (error) {
      toast.error('Something went wrong')
    }
    finally {
      setIsLoading(false)
    }
  }

  const category = watch('category')
  const location = watch('location')
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const imageSrc = watch('imageSrc')

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false,
  }), [location])

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        subtitle="Pick a category"
        title="Which of these best describes your place?"
      />
      <div
        className="
          grid
          max-h-[50vh]
          grid-cols-1
          gap-3
          overflow-y-auto
          md:grid-cols-2
        "
      >
        {categories.map(item => (
          <div className="col-span-1" key={item.label}>
            <CategoryInput
              icon={item.icon}
              label={item.label}
              onClick={category => setCustomValue('category', category)}
              selected={category === item.label}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          subtitle="Help guests find you!"
          title="Where is your place located?"
        />
        <CountrySelect
          onChange={value => setCustomValue('location', value)}
          value={location}
        />
        <Map center={location?.latlng} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          subtitle="What amenitis do you have?"
          title="Share some basics about your place"
        />
        <Counter
          onChange={value => setCustomValue('guestCount', value)}
          subtitle="How many guests do you allow?"
          title="Guests"
          value={guestCount}
        />
        <hr />
        <Counter
          onChange={value => setCustomValue('roomCount', value)}
          subtitle="How many rooms do you have?"
          title="Rooms"
          value={roomCount}
        />
        <hr />
        <Counter
          onChange={value => setCustomValue('bathroomCount', value)}
          subtitle="How many bathrooms do you have?"
          title="Bathrooms"
          value={bathroomCount}
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          subtitle="Show guests what your place looks like!"
          title="Add a photo of your place"
        />
        <ImageUpload
          onChange={value => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
      <Heading
        subtitle="Short and sweet works best!"
        title="How would you describe your place?"
      />
      <Input
        disabled={isLoading}
        errors={errors}
        id="title"
        label="Title"
        register={register}
        required
      />
      <hr />
      <Input
        disabled={isLoading}
        errors={errors}
        id="description"
        label="Description"
        register={register}
        required
      />
    </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          subtitle="How much do you charge per night?"
          title="Now, set your price"
        />
        <Input
          disabled={isLoading}
          errors={errors}
          formatPrice
          id="price"
          label="Price"
          register={register}
          required
          type="number"
        />
      </div>
    )
  }

  return (
    <Modal
      actionLabel={actionLabel}
      body={bodyContent}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryLabel={secondaryActionLabel}
      title="Airbnb your home!"
    />
  )
}
