import { useEffect, useState } from "react"
import { LuMinus, LuPlus } from "react-icons/lu"

interface CartItemProps {
    id:string,
    quantity:number,
    options:{any},
    setTotal:any,
    maxStock:number
}

export default function CartItem({id, quantity, options, setTotal, maxStock}:CartItemProps) {

    const [data, setData] = useState<any>(null)

    useEffect(()=>{        
        fetch(`http://localhost:3030/product/${id}`, {cache: "force-cache"}).then(res=>res.json()).then(data=>{
            setData(data.msg)
            setTotal((e)=>e+(data.msg?.price-(data.msg?.price*(data.msg?.discount/100)))*quantity);
        })
    }, [])


    function addQuantity(id) {
        if(quantity>=maxStock) {
            return;
        }

        let nData = JSON.parse(localStorage.getItem("cart"));
        for(let i=0;i<nData.length;i++) {
            if(nData[i].id==id && nData[i].quantity) {
                nData[i].quantity++;
            }
        }
        localStorage.setItem("cart", JSON.stringify(nData));        
        setTotal((e)=>e+(data?.price-(data?.price*(data?.discount/100))));
    }

    function minusQuantity(id) {
        let nData = JSON.parse(localStorage.getItem("cart"));
        for(let i=0;i<nData.length;i++) {
            if(nData[i].id==id) {
                nData[i].quantity--;
                if(nData[i].quantity==0) {
                    nData.splice(i, 1);
                }
            }
        }
        localStorage.setItem("cart", JSON.stringify(nData));
        setTotal((e)=>e-(data?.price-(data?.price*(data?.discount/100))));
    }

    if(!data) {
        return;
    }

    return (
        <li className="flex">
            <img
                className="w-48"
                src={data?.images[0]}
            />
            <div className="p-3">
                <h3 className="text-lg">{data?.name}</h3>
                {data?.discount>0?(
                        <>
                        <span className="font-bold">Rs. {(data?.price-data?.price*(data?.discount/100)).toFixed(2)}</span>
                        <small className="ml-2 text-[#666] line-through">{data?.price.toFixed(2)}</small>
                        </>
                ):(<span className="font-bold">Rs. {(data?.price-data?.price*(data?.discount/100)).toFixed(2)}</span>)}
                <table className="text-[#666] mt-3 block">
                    {
                        Object.keys(options).map(key=>{
                            return (
                            <tr>
                                <td className="capitalize">{key}</td>
                                <td className="text-right">{options[key]}</td>
                                 
                            </tr>
                            )
                        })
                    }
                    <tr>                      
                        <td>Quantity</td>
                        <td className="text-right">{quantity}</td>
                    </tr>
                    <tr>
                        <td className="font-bold">Total</td>
                        <td className="text-right">Rs. {((data?.price-(data?.price*(data?.discount/100)))*quantity).toFixed(2)}</td>
                    </tr>
                </table>

                <div className="flex w-32 justify-between border border-[#666] mt-4 p-3">
                    <button className="font-semibold cursor-pointer" onClick={()=>{minusQuantity(id)}}>
                        <LuMinus/>
                    </button>
                    {quantity}
                    <button className="font-semibold cursor-pointer" onClick={()=>{addQuantity(id)}}>
                        <LuPlus/>
                    </button>
                </div>
            </div>
        </li>
    )
}