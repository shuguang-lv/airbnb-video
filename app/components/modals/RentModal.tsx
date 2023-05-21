'use client'

import React, { useMemo, useState } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import Heading from '../Heading'
import { categories } from '../navbar/Categories'
import { CategoryInput } from '../inputs/CategoryInput'
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

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const bodyContent = (
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

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title='Airbnb your home!'
      body={bodyContent}
    />
  )
}
