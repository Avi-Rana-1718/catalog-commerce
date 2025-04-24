import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

interface OptionsItemsProps {
    data: {name:string, id?:string, stock?:number},
    callback: any
}

export default function OptionsItems({data, callback}: OptionsItemsProps) {

    const [nData, setNData] = useState(null);
    const params = useParams()
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(!data.hasOwnProperty("stock")) {
            let id = data?.id;
            fetch(`http://localhost:3030/product/${id=="0"?params.id:id}`, {cache:"force-cache"}).then(res=>res.json()).then(fetchedData=>{
                setNData(fetchedData.msg)
            })
        }
    }, [params.id, data])    

    if(!data.hasOwnProperty("stock")) {
        let id = data?.id!="0"?data?.id:params.id;
        return (
        <li className="border w-1/5 border-gray-300 border-l-0 cursor-pointer" onClick={()=>{
            callback(data.name);
            navigate(`/product/${id}`)
        }}>
            <img 
                src={nData && nData?.images[0]}
                className="w-full"
            />
        </li>
        )
    }

    return (
        <li
        className={`px-10 py-4 border border-gray-300 border-l-0 ${data?.stock==0?"text-[#888] bg-[#e6e4e4] cursor-not-allowed":"cursor-pointer"}`} onClick={()=>{
            if(data?.stock>0)
                callback(data.name, data?.stock)
        }}>
            {data.name}
        </li>
    )
}