'use client'

import useSWR, { preload } from 'swr'
import Example from '../../components/inputList'

const fetcher = async () => {
  const res = await fetch(`/api/getProduct`)
  const data = await res.json()
  return data
}

// const fetcher = (url: string) => axios.get(url).then(res => res.data)

preload(`/api/getProduct`, fetcher)


export default function Home() {
    const { data, isValidating } = useSWR('/api/getProduct', fetcher)
    // const data = await products()

    console.log("VALIDATING?: ", isValidating)
    console.log("DATA SWR: ", data)

    if (isValidating) return <p>Loading...</p>
    return (
        <>
            <Example people={data}/>
        </>
    )
}
