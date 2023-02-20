import Link from 'next/link'

export default function productDetail({ params }:any) {
    return (
        <>
            <Link href="/" >BACK</Link>
            <h1>{params.id}</h1>
            <p>{params.id}</p>
        </>
    )
}
