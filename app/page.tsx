import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import AddProductForm from '../components/addProductForm'

const inter = Inter({ subsets: ['latin'] })

// function to view data
async function getPosts() {
  const res = await fetch(`${process.env.BASE_URL}/api/posts`)

  if (!res.ok) {
    console.log(res)
  }
  return res.json()
}

// function to add product


export default async function Home() {
  const data = await getPosts()
  console.log(data)

  // console.log(req)
  // console.log(res)
  return (
    <>
      <p>halo</p>
      <p>halo lagi</p>
      <AddProductForm/>
    </>
  );
}
