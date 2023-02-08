'use client';

import { useEffect, useState } from 'react';

const styles = {
    button: "border border-green-400 px-2 mr-2 rounded"
}

async function getProducts() {
    // const res = await fetch(`${process.env.BASE_URL}/api/getProduct`)
    const res = await fetch(`/api/getProduct`)

    if (!res.ok) {
        console.log(res)
    }
    return await res.json();
}

export default async function GetProductsTable() {
    const [data, setData] = useState({})
    // const data = await getProducts();

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`/api/getProduct`)//getProducts();
            const responseJSON = await response.json();
            console.log("JSON RESPONSE ", responseJSON);
            setData(responseJSON);
        }
        getData();
    }, [])

    return(
        <>
            <p>{data}</p>
        </>

        // <table>
        //     <tbody>
        //         {data.map((data: any) => (
        //             <tr>
        //                 <td>{data.product}</td>
        //                 <td>{data.category}</td>
        //                 <td>{data.price}</td>
        //             </tr>
        //         ))}
        //     </tbody>
        // </table>

    );
}
