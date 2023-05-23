'use client'

import React, { useMemo, useState } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
import Heading from '../Heading'
import { categories } from '../navbar/Categories'
import { CategoryInput } from '../inputs/CategoryInput'
import { CountrySelect } from '../inputs/CountrySelect'
import { Counter } from '../inputs/Counter'
import { ImageUpload } from '../inputs/ImageUpload'
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
  const rentModal = useRentModal()
  const [step, setStep] = useState(STEPS.CATEGORY)
  const onBack = () => setStep(value => value - 1)
  const onNext = () => setStep(value => value + 1)
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
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  })

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
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category" />
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
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={category =>
                setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
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
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={value => setCustomValue('location', value)}
        />
        <Map center={location?.latlng} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <Counter
          onChange={value => setCustomValue('guestCount', value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter
          onChange={value => setCustomValue('roomCount', value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={value => setCustomValue('bathroomCount', value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={value => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title='Airbnb your home!'
      body={bodyContent}
    />
  )
}
