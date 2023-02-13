'use client'

import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import AddProductForm from '../components/addProductForm'
import GetProductsTable from '../components/productsTable'
import useSWR, { preload } from 'swr'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

// function to view data
// async function getPosts() {
//   const res = await fetch(`${process.env.BASE_URL}/api/getProduct`)
//   if (!res.ok) {
//     console.log(res)
//   }
//   return res.json()
// }

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

  console.log("VALIDATING?: ", isValidating)
  console.log("DATA SWR: ", data)

  if (isValidating) return <p>Loading</p>

  return (
    <>
      <AddProductForm/>

      <table>
        <tbody>
          {data.map((data: any) => (
            <tr key={data.id}>
              <td>{data.product}</td>
              <td>{data.category}</td>
              <td>{data.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*

      {data.map((data) => (
        <p key={data.id}>{data.product}</p>
      ))}
        */}

      {/* @ts-expect-error */}

      {/*
      <GetProductsTable data={data}/>
        */}

      <footer className="text-center">
        <p className="text-blue-900 hover:decoration-wavy">coba footer</p>
      </footer>
    </>
  );
}
