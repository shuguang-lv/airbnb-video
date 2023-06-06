import getCurrentUser from './actions/getCurrentUser'
import type { IListingsParams } from './actions/getListings'
import getListings from './actions/getListings'
import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import { EmptyState } from './components/EmptyState'
import { ListingCard } from './components/listing/ListingCard'

interface HomeProps {
  searchParams: IListingsParams
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className="
            grid
            grid-cols-1
            gap-8
            pt-24
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
          "
        >
            {listings.map(listing => (
              <ListingCard
                currentUser={currentUser}
                data={listing}
                key={listing.id}
              />
            ))}
          </div>
      </Container>
    </ClientOnly>
  )
}
