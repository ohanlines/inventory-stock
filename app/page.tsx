'use client'

import Image from 'next/image'
import Link from 'next/link'
import AddProductForm from '../components/addProductForm'
import GetProductsTable from '../components/productsTable'
import useSWR, { preload } from 'swr'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const styles = {
  tableOutsideBorder: "border border-black overflow-y-scroll h-96 rounded",
  tableBorder: "w-full table-fixed ",
  tableHead: "sticky top-0 bg-slate-50",
  hoverTableItems: "hover:shadow-md hover:border hover:border-blue-400"
}

// succeed fetch data using swr in page.tsx,
// but failed when passing the data to other component (productsTable.tsx)
const fetcher = async () => {
  const res = await fetch(`/api/getProduct`)
  const data = await res.json()
  return data
}

// const fetcher = (url: string) => axios.get(url).then(res => res.data)

preload(`/api/getProduct`, fetcher)

export default function Home() {
  // const data = await getPosts()
  const { data, error, isValidating } = useSWR(`/api/getProduct`, fetcher)
  const { register, reset, watch } = useForm({
    defaultValues: {
      search: ''
    }
  })

  console.log("VALIDATING?: ", isValidating)
  console.log("DATA SWR: ", data)

  const search = watch('search')

  if (isValidating) return <p>Loading</p>

    return (
      <>
        <div className="flex flex-col gap-4 p-10">
        {/*
          <AddProductForm/>
          */}

          <div className="flex flex-row justify-end">
            <div className="basis-1/12 bg-sky-500">
              <p>coba</p>
            </div>
            <div className="basis-11/12 item-center bg-cyan-500">
              <form className="flex">
                <input {...register('search')}
                  placeholder='search...'
                  className="w-1/2 ml-auto border border-black rounded-l-md px-2 py-2"/>
                <button type='button' className="border border-black rounded-r-md px-2 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 stroke-width-3 stroke-black fill-none">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>

          <div className={styles.tableOutsideBorder}>
            <table className={styles.tableBorder}>
              <thead className={styles.tableHead}>
                <tr>
                  <th>Product Name</th>
                  <th>Product Category</th>
                  <th>Price</th>
                </tr>
              </thead>

              <tbody>
                {data
                  .filter((data: any) => {
                    return search?.toLowerCase() === ''
                    ? data
                    : data.product?.toLowerCase().includes(search);
                  })
                  .map((data: any) => (
                  <tr key={data.id} className={styles.hoverTableItems}>
                    <td>{data.product}</td>
                    <td>{data.category}</td>
                    <td>{data.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <footer>
            <p className="text-blue-900 hover:decoration-wavy">Coba Footer, Sekalian Coba Emoji 😠</p>
          </footer>
        </div>
      </>
    );
}
