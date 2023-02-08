import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import AddProductForm from '../components/addProductForm'
import GetProductsTable from '../components/productsTable'

const inter = Inter({ subsets: ['latin'] })

// function to view data
async function getPosts() {
  const res = await fetch(`${process.env.BASE_URL}/api/getProduct`)

  if (!res.ok) {
    console.log(res)
  }
  return res.json()
}

// function to add product


export default async function Home() {
  // const data = await getPosts()
  // console.log(data)

  // console.log(req)
  // console.log(res)
  return (
    <>
      <AddProductForm/>

      {/* @ts-expect-error */}
      {/*
      <GetProductsTable/>
      <p>coba</p>

      <p>coba2</p>
      <table>
        <tbody>
          {data.map((data) => (
            <tr>
              <td>{data.product}</td>
              <td>{data.category}</td>
              <td>{data.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
       */}
    </>
  );
}
