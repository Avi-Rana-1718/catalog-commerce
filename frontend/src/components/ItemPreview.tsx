import { useEffect, useState } from "react"

export default function ItemPreview({id, quantity}:{id:Number, quantity:Number}) {
   const [data, setData] = useState(null);

   useEffect(()=>{
        fetch(`http://localhost:3030/product/${id}`).then(res=>res.json()).then(data=>{
            setData(data.msg)         
        })
   }, [])
   
    return (
        <li className="flex mb-3">
            <img
                src={data?.images[0]}
                className="w-12"
            />
            <p className="ml-4">
                <span className="block">
                    {data?.name}
                </span>
                <span className="text-[#6b6b6b]">
                    Quantity: {quantity}
                </span>
            </p>
        </li>
    )
}