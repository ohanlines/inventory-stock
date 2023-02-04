'use client';

import { useForm } from 'react-hook-form';
import React from 'react';

async function AddProduct(data: any) {
    const res = await fetch('/api/addProduct', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/text'
        }
    })
    if (!res.ok) {
        throw new Error(res.statusText)
    }
    return await res.json();
}

export default function AddProductForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    console.log(errors);

   return(
       <form onSubmit={handleSubmit((data) => {
           try {
               AddProduct(data);
               console.log("DATA: ", data);
           }   catch (err) {
               console.log("ERROR: ", err);
           }})}>

           <input {...register("product", {
               required: "this is required."
                }
            )}
            placeholder="product"/>

           <input {...register("category", {
               required: "this is required."
                }
            )}
            placeholder="category"/>

           <input {...register("price",{
               required: "this is required.",
               valueAsNumber: true,
                }
            )}
            type="number"
            placeholder="price"
            />

           <input type="submit" />
       </form>
   )
}
