'use client'
import Link from 'next/link'
import Example from '../components/inputList'

export default function Home() {
  return (
    <>
    <Link href="/products">To Products</Link>
    <Example />
    </>
  );
}
