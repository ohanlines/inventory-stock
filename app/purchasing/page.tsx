'use client'

import useSWR, { preload } from 'swr'
import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import InputList from '../../components/inputList'
import LoadingScreen from '../../components/loadingScreen'

const styles = {
  inputButton: "transision ease-in-out delay-10 border border-green-400 hover:bg-green-400 hover:scale-110 duration-10 px-2 mr-2 rounded",
  numInputDiv: "cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm mr-2 ",
  numInput: "border-none focus:outline-none py-2 pl-3 pr-3 text-sm leading-5 text-gray-900 focus:ring-0 w-16",
}

const fetcher = async () => {
  const res = await fetch(`/api/getProduct`)
  const data = await res.json()
  return data
}

preload(`/api/getProduct`, fetcher)


export default function Home() {
    const [showError, setShowError] = useState({ isActive: false, text: '' })
    const [dataProductSet, setDataProductSet] = useState<Set<string>>(new Set());
    const { data, error, isValidating, isLoading } = useSWR('/api/getProduct', fetcher)
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

    // Convert fetched data into set
    useEffect(() => {
      if (data && !error) {
        const newSet = new Set(data.map((item: any) => item.product))
        setDataProductSet(newSet)
      }
    }, [data, error])

    // console.log("DATA SET", dataProductSet)
    // console.log("DATA", data)

    // if (isLoading) return <LoadingScreen />

    // if (isValidating) {
    //   <LoadingScreen/>
    //   setTimeout(() => {

    //   <LoadingScreen/>
    //   }, 1000)
    // }

    if (isValidating) return <LoadingScreen />

    const submitData = (data: any) => {
      try {
        const dataArray = data.cart
        const dataSet = new Set(dataArray.map((item: any) => item.product))

        // check is user input unique product
        const isProductUnique = dataSet.size === dataArray.length

        // check is input exist inside db
        const isProductExist = [...dataSet].every(value => dataProductSet.has(value))

        // if statement for isProductUnique
        // if (isProductUnique) {
        //   console.log("DATA: ", data)
        //   reset()
        // } else {
        //   setShowError(true)
        // }

        // BELOM SELESAI
        // if statement for isProductDifferent

        if (isProductExist) {
          if (isProductUnique) {
            console.log("DATA: ", data)
          } else {
            setShowError({isActive: true, text: 'Nama Product yang Diinput Tidak Boleh Sama'})
            return
          }
          reset()
        } else {
          setShowError({isActive: true, text: 'Terjadi Kesalahan Input'})
        }

      } catch (err) {
        console.log("ERROR: ", err)
      }
    }

    return (
        <>
          {/*
          <div>
            <p>coba</p>
            <p>koko</p>
          </div>

            <div className="absolute inset-0 flex justify-center items-center backdrop-filter backdrop-blur-sm z-50">
            <ErrorFloating
              comment="Nama Product yang diinput Tidak Boleh Sama"
              error={showError}
              setShowError={setShowError()} />
            */}

            {/*
              */}

            <div className={`absolute inset-0 flex justify-center items-center backdrop-filter backdrop-blur-sm z-50 transition-all ${showError.isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
              <div className="">
                <div className="bg-red-500 text-white p-8 rounded-lg">
                  <div className="pb-2">
                    {showError.text}
                  </div>
                  <div className="flex justify-end pt-2">
                    <div
                      onClick={() => setShowError({isActive: false, text: ''})}
                      className="flex w-1/3 text-black bg-white rounded justify-center items-center cursor-pointer">
                      Oke
                    </div>
                  </div>
                </div>
              </div>
            </div>

          <div className="flex justify-center">
            <form>
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
                  onClick={handleSubmit((data) => submitData(data))}
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
