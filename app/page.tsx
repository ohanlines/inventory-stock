import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import AddProductForm from '../components/addProductForm'
import GetProductsTable from '../components/productsTable'

const inter = Inter({ subsets: ['latin'] })

// function to view data
async function getPosts() {
  const res = await fetch(`${process.env.BASE_URL}/api/getProduct`)
  console.log(res, "GET")
  if (!res.ok) {
    console.log(res)
  }
  return res.json()
}

// function to add product


export default async function Home() {
  const data = await getPosts()
  console.log(data, "HOME")

  // console.log(req)
  // console.log(res)
  return (
    <>
      <AddProductForm/>

      {/* @ts-expect-error */}
      <GetProductsTable data={data}/>

      <footer className="text-center">
        <p className="text-blue-900 hover:decoration-wavy">coba footer</p>
      </footer>
    </>
  );
}
