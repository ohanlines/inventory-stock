'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import React from 'react';
import Link from 'next/link'
import productDetail from '../[id]/page';

const styles = {
    inputForm: "border border-green-400 px-2 mr-2 rounded",
    inputButton: "transision ease-in-out delay-10 border border-green-400 hover:bg-green-400 hover:scale-110 duration-10 px-2 mr-2 rounded"
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

export default function Home() {
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm({
        defaultValues: {
            cart: [{
                product: '',
                category: '',
                price: ''
            }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        name: 'cart',
        control,
    })

    const submitData = (data: any) => {
            try {
                AddProduct(data);
                reset()
                console.log("DATA: ", data);
            }   catch (err) {
                console.log("ERROR: ", err);
            }}

   return(
       <div className="flex justify-center">
         <Link href="/products/" >BACK</Link>
         <form>
           {fields.map((field, index) => {
           return <section key={field.id} className="my-2">
             <input {...register(`cart.${index}.product`, {
                        required: "this is required."
                        }
                    )}
                    placeholder="Product"
                    className={styles.inputForm}/>

             <input {...register(`cart.${index}.category`, {
                        required: "this is required."
                        }
                    )}
                    className={styles.inputForm}
                    placeholder="Category"/>

             <input {...register(`cart.${index}.price`, {
                        required: "this is required.",
                        valueAsNumber: true,
                        }
                    )}
                    type="number"
                    placeholder="Price"
                    className={styles.inputForm}
                    />

             <button
                onClick={() => remove(index)}
                className={styles.inputButton}>
                Delete
             </button>
           </section>
           })}

           <div className="flex flex-row justify-end">
           <button
             type='button'
             onClick={() => {
                 append({
                     product: '',
                     category: '',
                     price: ''
                 })
             }}
            className={styles.inputButton}>
            Add More..
           </button>

           <button
            onClick={handleSubmit((data) => submitData(data))}
            className={styles.inputButton}>
            Submit
           </button>
           </div>
         </form>
       </div>
   )
}
