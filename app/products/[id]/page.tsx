import Link from 'next/link'

async function getProduct(param: any) {
    const res = await fetch(`${process.env.BASE_URL}/api/filterGetProduct/${param}`)
    // const res = await fetch (`${process.env.BASE_URL}/api/getProduct`)
    const data = await res.json()

    return data
}

export default async function productDetail({ params }: any) {
    const data = await getProduct(params.id)
    const item = data[0]

    console.log(data)
    console.log("PARAMS: ", params)
    // console.log("<<< ", params.id)
    // console.log(">>> ", item)
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
            </ul>
            {/*

            <h1>{params.id}</h1>
            <p>{params.id}</p>
              */}
        </>
    )
}
