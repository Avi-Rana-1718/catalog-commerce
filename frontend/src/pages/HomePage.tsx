import { useEffect, useState } from "react";
import Nav from "../components/user/Nav";
import ProductCard from "../components/user/ProductCard";
import { LuLoaderCircle } from "react-icons/lu";

export default function HomePage() {

    const [data, setData] = useState(null)
    
    useEffect(()=>{
        fetch("http://localhost:3030/product/all").then(res=>res.json()).then(data=>{
            console.log(data);
            
            setData(data.msg)
        })
    }, []);

    if(!data) {
        return (
            <>
            <Nav/>
            <div className="w-full h-screen flex items-center justify-center">
                <LuLoaderCircle className="text-9xl animate-spin text-[#DC0C15] opacity-70"/>
            </div>
            </>
        )
    }

    return (
        <>
        <Nav />
        <div className="p-3">
            <h3>NEW IN</h3>
            <ul className="flex mt-3 flex-wrap gap-y-5">
            {data && data.map((el:any)=>{
                    let totalStock=0;
                     Object.keys(el?.options).forEach(key=>{
                        el?.options[key].forEach(e=>{
                            totalStock+=typeof e?.stock === "number"?e?.stock:0;
                        })
                    })
                    
                return <ProductCard name={el?.name} key={el?.productid} price={el?.price} discount={el?.discount} images={el?.images} id={el?.productid} stock={totalStock}/>
            })}
            </ul>
        </div>
        </>
    )
}