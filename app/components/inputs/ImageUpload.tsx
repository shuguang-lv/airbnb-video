'use client'

import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'
import React, { useCallback } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var cloudinary: any
}

interface ImageUploadProps {
  onChange: (value: string) => void
  value: string
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url)
  }, [onChange])

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      options={{
        maxFiles: 1,
      }}
      uploadPreset="im5dzozn"
    >
      {({ open }) => (
          <div
            className="
              relative
              flex
              cursor-pointer
              flex-col
              items-center
              justify-center
              gap-4
              border-2
              border-dashed
              border-neutral-300
              p-20
              text-neutral-600
              transition
              hover:opacity-70
            "
            onClick={() => open?.()}
          >
            <TbPhotoPlus
              size={50}
            />
            <div className="text-lg font-semibold">
              Click to upload
            </div>
            {value
              ? <div className="
              absolute inset-0 h-full w-full"
                     >
                <Image
                  alt="House"
                  fill
                  src={value}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              : null}
          </div>
      )}
    </CldUploadWidget>
  )
}
