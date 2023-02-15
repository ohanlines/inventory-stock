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
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            product: "",
            category: "",
            price: ""
        }
    });

    // console.log(errors);

   return(
       <div className="flex justify-center">
           <form onSubmit={handleSubmit((data) => {
            try {
                AddProduct(data);
                reset()
                console.log("DATA: ", data);
            }   catch (err) {
                console.log("ERROR: ", err);
                }})}>

            <input {...register("product", {
                required: "this is required."
                }
            )}
            placeholder="Product"
            className={styles.button}/>

           <input {...register("category", {
               required: "this is required."
                }
            )}
            className={styles.button}
            placeholder="Category"/>

           <input {...register("price",{
               required: "this is required.",
               valueAsNumber: true,
                }
            )}
            type="number"
            placeholder="Price"
            className={styles.button}
            />

           <input type="submit" className="transision ease-in-out delay-150 border border-green-400 hover:bg-green-400 hover:scale-110 duration-300 px-2 rounded"/>
           </form>
       </div>
   )
}
