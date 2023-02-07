'use client';

import { useForm } from 'react-hook-form';
import React from 'react';

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
    const data = await getProducts();

    console.log("DATA GUEH ", data[0].product);

    return(
        <>
            <p>{data[0].product}</p>
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
