import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import ProductCard from "../components/ProductCard";

export default function HomePage() {

    const [data, setData] = useState([])
    
    useEffect(()=>{
        fetch("http://localhost:3030/product/all").then(res=>res.json()).then(data=>{
            console.log(data);
            
            setData(data.msg)
        })
    }, []);

    return (
        <>
        <Nav />
        <div className="p-3">
            <h3>NEW IN</h3>
            <ul className="flex mt-3">
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