// 'use client'
import Link from 'next/link'
import DeleteProductButton from '../../../components/deleteProductButton'

async function getProduct(param: any) {
    const res = await fetch(`${process.env.BASE_URL}/api/filterGetProduct/${param}`)
    const data = await res.json()

    return data
}


export default async function productDetail({ params }: any) {
    const data = await getProduct(params.id)
    const item = data[0]

    console.log("PARAMS: ", params)
    return (
        <>
            <Link href="/products/" >BACK</Link>
            {/*

              */}
            <ul>
                <li>{item.id}</li>
                <li>{item.product}</li>
                <li>{item.category}</li>
                <li>{item.price}</li>
                <li>{item.stock}</li>
            </ul>

            <DeleteProductButton id={item.id} />
            {/*

            <h1>{params.id}</h1>
            <p>{params.id}</p>
              */}
        </>
    )
}
