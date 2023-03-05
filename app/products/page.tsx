'use client'

import useSWR, { preload } from 'swr'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { ArrowPathIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const styles = {
  tableOutsideBorder: "border border-black overflow-y-scroll h-96 rounded",
  tableBorder: "w-full table-fixed ",
  tableHead: "sticky top-0 bg-slate-50",
  hoverTableItems: "cursor-pointer hover:shadow-md hover:border hover:border-blue-400"
}

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

  const router = useRouter()
  const search = watch('search')

  if (isValidating) return <p>Loading</p>

    return (
      <>
        <div className="flex flex-col gap-4 p-10">
          <div className="flex flex-row justify-end">
            <div
              onClick={() =>
                  router.push('products/add-product')
                }
              className="flex basis-1/12 border border-black rounded justify-center items-center cursor-pointer">
              <PlusSmallIcon className="w-6 h-6" />
              <p className="ml-2">Add New</p>
            </div>

            <div className="basis-11/12 item-center">
              <form className="flex">
                <input {...register('search')}
                  placeholder='search...'
                  className="w-1/2 ml-auto border border-black rounded-l-md px-2 py-2"/>
                <button onClick={() => reset()} type='button' className="border border-black rounded-r-md px-2 py-2">
                  <ArrowPathIcon className="w-4 h-4 stroke-width-3 stroke-black fill-none" />
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
                  <th>Stock</th>
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
                  <tr onClick={() => {
                    router.push(`/products/${data.id}`)
                  }} key={data.id} className={styles.hoverTableItems}>
                    <td>{data.product}</td>
                    <td>{data.category}</td>
                    <td>{data.price}</td>
                    <td>{data.stock}</td>
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
