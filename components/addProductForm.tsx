'use client';

import { useForm } from 'react-hook-form';
import React from 'react';

export default function AddProductForm() {


    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmit = async (data:any) => {

        console.log(data);
        const res = await fetch('/api/addProduct', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // if (!res.ok) {
        //     throw new Error(res.statusText)
        // }

        const result = JSON.stringify(data);
        console.log(result);
        const result2 = data;
        console.log(JSON.stringify(result2));
    }
    // async function addProduct(data: any) {


    //     console.log(data.product)
    //     const res = await fetch(`/api/addProduct`, {
    //         method: 'POST',
    //         body: JSON.stringify(data)
    //     })
    //     if (!res.ok) {
    //         throw new Error(res.statusText);
    //     }
    // }

    //  const onSubmit = async (data: any, e: React.SyntheticEvent) => {
    //      e.preventDefault();
    //      addProduct(data);
    // }

   console.log(errors);
   return(
       <form onSubmit={handleSubmit(onSubmit)}>
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
               pattern: {
                   value: /[0-9]/,
                   message: "ANJING"
                    }
                }
            )}
            placeholder="price"/>

           <input type="submit" />
       </form>
   )
}
