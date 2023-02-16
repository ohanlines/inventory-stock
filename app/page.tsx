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

          <form>
            <input {...register('search')}
              placeholder='search...'
              className="border border-black px-2"/>
          </form>


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
