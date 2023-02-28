'use client';

import useSWR, { preload } from 'swr'
// import { useEffect, useState } from 'react';

// const styles = {
//     button: "border border-green-400 px-2 mr-2 rounded"
// }

// async function getProducts() {
//     // const res = await fetch(`${process.env.BASE_URL}/api/getProduct`)
//     const res = await fetch(`/api/getProduct`)

//     if (!res.ok) {
//         console.log(res)
//     }
//     return await res.json();
// }

// const fetcher = async () => {
//   const res = await fetch(`/api/getProduct`)
//   const data = await res.json()
//   return data
// }

// const fetcher = (url: string) => fetch(url).then(res => res.json())

// preload(`/api/getProduct`, fetcher)

export default function GetProductsTable() {
    // const { data, error } = useSWR(`/api/getProduct/`, fetcher)

    // const { data } = props
    // console.log("DATA TABLE: ", data)
    // console.log("TYPE: ", typeof data)
    // const [data, setData] = useState({})
    // const data = await getProducts();

    return(
        <>
            <p className="hover:underline hover:decoration-wavy">Test Wavy Underline</p>

        <table>
            <tbody>
                {data.map((data: any) => (
                    <tr>
                        <td>{data.product}</td>
                        <td>{data.category}</td>
                        <td>{data.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>

    );
}
