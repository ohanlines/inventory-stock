'use client'

import useSWR, { preload } from 'swr'
import { useForm, useFieldArray } from 'react-hook-form'
import InputList from '../../components/inputList'

const styles = {
  inputButton: "transision ease-in-out delay-10 border border-green-400 hover:bg-green-400 hover:scale-110 duration-10 px-2 mr-2 rounded",
  numInputDiv: "cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm mr-2",
  numInput: "border-none focus:outline-none py-2 pl-3 pr-3 text-sm leading-5 text-gray-900 focus:ring-0 w-16"
}

const fetcher = async () => {
  const res = await fetch(`/api/getProduct`)
  const data = await res.json()
  return data
}

preload(`/api/getProduct`, fetcher)


export default function Home() {
    const { data, isValidating } = useSWR('/api/getProduct', fetcher)
    const { register, handleSubmit, reset, control } = useForm({
      defaultValues: {
        cart: [{
          product: '',
          amount: ''
        }]
      }
    })
    // const product = register('product', {required: true})
    // console.log("VALIDATING?: ", isValidating)
    // console.log("DATA SWR: ", data)

    const { fields, append, remove } = useFieldArray({
      name: 'cart',
      control
    })

    const sumbitData = (data: any) => {
      try {
        console.log("DATA: ", data);
      } catch (err) {
        console.log("ERROR: ", err)
      }
    }

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
              {fields.map((field, index) => {
              return <section key={field.id} className="flex flex-row my-2">
                <div className="mr-2">
                  <InputList
                    name={`cart.${index}.product`}
                    register={register}
                    data={data}/>
                </div>

                <div className={styles.numInputDiv}>
                  <input {...register(`cart.${index}.amount`, {required: true})}
                         type='number'
                         className={styles.numInput}/>
                </div>

                <button
                  onClick={() => remove(index)}
                  className={styles.inputButton}>
                  Delete
                </button>
              </section>
              })}


              <div className="flex flex-row justify-end">
                <button
                  type='button'
                  onClick={() => {

                  append({
                  product: '',
                  amount: ''
                  })
                  }}
                  className={styles.inputButton}>
                  Add More..
                </button>

                <button
                  className={styles.inputButton}
                  type='submit'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
    )
}
