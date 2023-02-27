'use client'


async function deleteProduct(param: any) {
    const res = await fetch(`/api/deleteProduct/${param}`)
    // const res = await fetch(`${process.env.BASE_URL}/api/deleteProduct/${param}`)
    // const res = await fetch (`${process.env.BASE_URL}/api/getProduct`)
    const data = await res.json()

    return data

}

export default function DeleteProductButton({ id }: String) {
    console.log("ID >>>", id)
    return(
        <>
            <button type='button' onClick={() => deleteProduct(id)} >Delete Product</button>
        </>
    )
}
