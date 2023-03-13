'use client'

import useSWR, { preload } from 'swr'
import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import InputList from '../../components/inputList'
import LoadingScreen from '../../components/loadingScreen'

const styles = {
  inputButton: "transision ease-in-out delay-10 border border-green-400 hover:bg-green-400 hover:scale-110 duration-10 px-2 mr-2 rounded",
  numInputDiv: "relative cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm mr-2 ",
  numInput: "border-none focus:outline-none py-2 pl-3 pr-8 text-sm leading-5 text-gray-900 focus:ring-0 w-20",
}

const fetcher = async () => {
  const res = await fetch(`/api/getProduct`)
  const data = await res.json()
  return data
}

export default function Home() {
    const [showError, setShowError] = useState({ isActive: false, text: '' })
    const [dataProductSet, setDataProductSet] = useState<Set<string>>(new Set());
    const { data, error, isValidating, isLoading } = useSWR('/api/getProduct', fetcher)
    const { register, handleSubmit, reset, control, getValues, watch } = useForm({
      defaultValues: {
        cart: [{
          product: '',
          amount: ''
        }]
      }
    })
    const { fields, append, remove } = useFieldArray({
      name: 'cart',
      control
    })

    // === CONVER FETCHED DATA INTO SET ===================
    useEffect(() => {
      if (data && !error) {
        const newSet = new Set(data.map((item: any) => item.product))
        setDataProductSet(newSet)
      }
    }, [data, error])

    // === LOADING SCREEN WITH TIMEOUT =====================
    if (isValidating) return <LoadingScreen />

    // console.log("DATA SET", dataProductSet)
    // console.log("DATA", data)

    // if (isLoading) return <LoadingScreen />

    // if (isValidating) {
    //   <LoadingScreen/>
    //   setTimeout(() => {

    //   <LoadingScreen/>
    //   }, 1000)
    // }

    // === GET STOCK FOR NUMBER INPUT DISPLAY ==============
    const getStockByProduct = (product: String) => {
      const dataProduct = data?.find((item: any) =>item.product === product)
      const result = dataProduct?.stock
      return result
    }

    // === ONCHANGE USING WATCH ============================
    const value = watch("cart")
    const valueMap = value.map((data) => data.product)


    // === HANDLING SUMBIT FORM ============================
    const submitData = (data: any) => {
      try {
        const dataArray = data.cart
        const dataSet = new Set(dataArray.map((item: any) => item.product))

        // check is user input unique product
        const isProductUnique = dataSet.size === dataArray.length

        // check is input exist inside db
        const isProductExist = [...dataSet].every(value => dataProductSet.has(value))

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
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <p className="text-gray-300">/ {getStockByProduct(valueMap[index])}</p>
                  </div>
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
