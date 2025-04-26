import { useEffect, useState } from "react";
import Nav from "../components/user/Nav";
import ProductCard from "../components/user/ProductCard";
import { useSearchParams } from "react-router";

export default function SearchPage() {

    const [searchParams] = useSearchParams()

    const [data, setData] = useState(null);
    const [query] = useState(searchParams.get("name"))
    useEffect(()=>{
        fetch(`http://localhost:3030/product/search?name=${query}`).then(res=>res.json()).then(data=>{
            console.log(data);
            
            setData(data.msg)
        })
    }, [searchParams])

    return (
            <>
            <Nav />
            <div className="p-3">
                <div className="mb-20">
                    <h5 className="text-lg text-[#555] mt-4 uppercase font-['Oswald']">SEARCH RESULT</h5>
                    <h4 className="text-5xl mt-4 uppercase font-['Oswald'] leading-4">{query}</h4>
                </div>
                <h5 className="uppercase text-xl font-bold text-[#555]">RESULTS [{data!=null?data.length:0}]</h5>
                <ul className="flex flex-wrap mt-5">
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