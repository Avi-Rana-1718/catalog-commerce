import { useEffect, useState } from "react"

export default function CartItem({id, quantity, setTotal, setQuantity}:{id:string, quantity:number, setTotal:any, setQuantity}) {

    const [data, setData] = useState<any>(null)

    useEffect(()=>{        
        fetch(`http://localhost:3030/product/${id}`).then(res=>res.json()).then(data=>{
            setData(data.msg)
            setTotal((e)=>e+(data.msg?.price-(data.msg?.price*(data.msg?.discount/100)))*quantity);  
            setQuantity((e)=>e+quantity)          
        })
    }, [])


    function addQuantity(id) {
        let nData = JSON.parse(localStorage.getItem("cart"));
        for(let i=0;i<nData.length;i++) {
            if(nData[i].id==id) {
                nData[i].quantity++;
            }
        }
        localStorage.setItem("cart", JSON.stringify(nData));        
        setTotal((e)=>e+(data?.price-(data?.price*(data?.discount/100))));
        setQuantity((e)=>e+1);
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
        setQuantity((e)=>e-1);
    }

    if(!data) {
        return <tr className="animate-pulse h-20 bg-gray-200 p-3 border-2 border-[#F2F2F2]">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        </tr>
    }

    return (
        <tr>
            <td className="p-3 border-2 border-[#F2F2F2]">
            <img
                className="w-30 mx-auto "
                src={data?.images[0]}
            />
            </td>
            <td className="p-3 border-2 border-[#F2F2F2]">
                <h3>{data?.name}</h3>
                {data?.discount>0?(
                        <>
                        <span className="text-[#6F48EC] font-bold">${(data?.price-data?.price*(data?.discount/100)).toFixed(2)}</span>
                        <small className="ml-2 text-[#5539b3] line-through">{data?.price.toFixed(2)}</small>
                        </>
                ):(<span className="text-[#6F48EC] font-bold">${(data?.price-data?.price*(data?.discount/100)).toFixed(2)}</span>)}
            </td>
            <td className="p-3 border-2 border-[#F2F2F2]">
                <div className="flex justify-between">
                    <button className="font-semibold cursor-pointer" onClick={()=>{minusQuantity(id)}}>-</button>
                    {quantity}
                    <button className="font-semibold cursor-pointer" onClick={()=>{addQuantity(id)}}>+</button>
                </div>
            </td>
            <td className="text-center p-3 border-2 border-[#F2F2F2]">
                {(data?.price-(data?.price*(data?.discount/100)))}x{quantity}={(data?.price-(data?.price*(data?.discount/100)))*quantity}
            </td>
        </tr>
    )
}