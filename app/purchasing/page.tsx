'use client'

import useSWR, { preload } from 'swr'
import { useForm } from 'react-hook-form'
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
    const { register, handleSubmit, watch } = useForm()
    // const product = register('product', {required: true})
    // console.log("VALIDATING?: ", isValidating)
    // console.log("DATA SWR: ", data)

    // const coba = watch('product')
    // console.log("COBA: ", coba)
    if (isValidating) return <p>Loading...</p>
    return (
        <>
          {/*
          <div>
            <p>coba</p>
            <p>koko</p>
          </div>


            */}
          <div className="flex justify-center">
            <form onSubmit={handleSubmit((data) => console.log("DATA: ", data))}>
              <Example
                name='coba'
                register={register}
                people={data}/>
              <button type='submit'> Submit </button>
            </form>
          </div>
        </>
    )
}
