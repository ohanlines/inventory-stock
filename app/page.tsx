import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

async function getPosts() {
  const res = await fetch(`${process.env.BASE_URL}/api/posts`)

  if (!res.ok) {
    console.log(res)
  }
  return res.json()
}

export default async function Home() {
  const data = await getPosts()
  console.log(data)
  return (
    <main className={styles.main}>
      <p>Hello World</p>
    </main>
  )
}
