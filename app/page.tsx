import Image from 'next/image'
import AddProductForm from '../components/addProductForm'
import GetProductsTable from '../components/productsTable'
import Link from 'next/link'

export default function Home() {
  return (
    <Link href="/products">To Products</Link>
  );
}
