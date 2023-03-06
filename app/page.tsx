import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Link href="/products">To Products</Link>
      <br/>
      <Link href='/purchasing'>Purchasing</Link>
    </>
  );
}
