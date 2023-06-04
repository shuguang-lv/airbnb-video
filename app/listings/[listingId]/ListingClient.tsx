'use client'

import type { Reservation } from '@prisma/client'
import { useMemo } from 'react'
import type { SafeListing, SafeUser } from '@/app/types'
import { categories } from '@/app/components/navbar/Categories'
import Container from '@/app/components/Container'
import { ListingHead } from '@/app/components/listing/ListingHead'
import { ListingInfo } from '@/app/components/listing/ListingInfo'

interface ListingClientProps {
  reservations?: Reservation[]
  listing: SafeListing & { user: SafeUser }
  currentUser?: SafeUser | null
}

export const ListingClient: React.FC<ListingClientProps> = ({ listing, currentUser }) => {
  const category = useMemo(() => {
    return categories.find(item => item.label === listing.category)
  }, [listing.category])
  return (
    <Container>
      <div
        className="
          mx-auto
          max-w-screen-lg
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
              mt-6
              grid
              grid-cols-1
              md:grid-cols-7
              md:gap-10
            "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div
              className="
                order-first
                mb-10
                md:order-last
                md:col-span-3
              "
            >
              {/* <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={value => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
