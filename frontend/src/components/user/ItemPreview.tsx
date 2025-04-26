import { useEffect, useState } from "react"

interface ItemPreview {
    id:number,
    quantity:number,
    price:number,
    options:{any}
}

export default function ItemPreview({id, quantity, price, options}:ItemPreview) {
   const [data, setData] = useState(null);

   useEffect(()=>{
        fetch(`http://localhost:3030/product/${id}`, {cache: "force-cache"}).then(res=>res.json()).then(data=>{
            setData(data.msg)         
        })
   }, [])
   
    return (
        <li className="flex mb-3">
            <img
                src={data?.images[0]}
                className="w-20"
            />
            <div className="ml-4">
                <h4>{data?.name}</h4>
                <div className="text-[#666]">
                    {Object.keys(options).map(key=>(
                        <span className="capitalize block">{key}: {options[key]}</span>
                    ))}
                </div>
                <span className="text-[#666]">
                    Quantity: {quantity} <br/>
                    Price: {Number(price).toFixed(2)}
                </span>
            </div>
        </li>
    )
}