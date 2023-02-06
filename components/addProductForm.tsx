'use client';

import { useForm } from 'react-hook-form';
import React from 'react';

const styles = {
    button: "border border-green-400 px-2 mr-2 rounded"
}

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
       <div className="flex justify-center py-4">
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
            placeholder="Product"
            class={styles.button}/>

           <input {...register("category", {
               required: "this is required."
                }
            )}
            class={styles.button}
            placeholder="Category"/>

           <input {...register("price",{
               required: "this is required.",
               valueAsNumber: true,
                }
            )}
            type="number"
            placeholder="Price"
            class={styles.button}
            />

           <input type="submit" class="transision ease-in-out delay-150 border border-green-400 hover:bg-green-400 hover:scale-110 duration-300 px-2 rounded"/>
           </form>
       </div>
   )
}
