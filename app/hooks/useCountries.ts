import countries from 'world-countries'

const formattedCountries = countries.map(country => ({
  flag: country.flag,
  label: country.name.common,
  latlng: country.latlng,
  region: country.region,
  value: country.cca2,
}))

function useCountries() {
  const getAll = () => formattedCountries
  const getByValue = (value: string) => formattedCountries.find(item => item.value === value)

  return {
    getAll,
    getByValue,
  }
}

export default useCountries
