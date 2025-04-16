import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import ProductItem from "../components/ProductItem";

export default function Index() {

    const [data, setData] = useState([])
    
    useEffect(()=>{
        fetch("http://localhost:3030/product/all").then(res=>res.json()).then(data=>{
            console.log(data);
            
            setData(data)
        })
    }, []);

    return (
        <>
        <Nav />
        <ul className="m-3 flex gap-x-2">
            
        {data && data.map((el:any)=>{
            return <ProductItem name={el?.name} key={el?.productid} price={el?.price} discount={el?.discount} images={el?.images} id={el?.productid}/>
        })}
        </ul>
        </>
    )
}