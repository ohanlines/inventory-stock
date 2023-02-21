import Link from 'next/link'

async function getProduct() {
    const res = await fetch (`${process.env.BASE_URL}/api/getProduct`)
    const data = await res.json()

    return data
}

export default async function productDetail({ params }: any) {
    const data = await getProduct()
    const item = data.find(i => i.id === params.id)

    console.log("<<< ", params.id)
    console.log(">>> ", item)
    return (
        <>
            <Link href="/" >BACK</Link>
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
