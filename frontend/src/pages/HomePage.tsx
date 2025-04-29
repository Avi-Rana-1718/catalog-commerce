import { useEffect, useState } from "react";
import Nav from "../components/user/Nav";
import ProductCard from "../components/user/ProductCard";
import { LuLoaderCircle } from "react-icons/lu";
import { Link } from "react-router";
import Footer from "../components/user/Footer";

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
        <Link to="/product/5139249a-0f4d-4afb-ad9c-73b4f98fa3f7" className=":relative text-white">
            <img className="w-full h-[90lvh] object-cover object-center" src="https://image.hm.com/content/dam/global_campaigns/season_01/men/ms21lh10/scroll/MS21LH10-rugged-luxe-LP2-CPD-CPM-3x2.jpg"/>
            <span className="absolute  bottom-25 md:bottom-10 left-1/6 md:left-15 font-['Oswald'] uppercase text-6xl tracking-wider">Rugged Lux</span>
            <span className="text-xl underline absolute px-2 py-1 bottom-10 right-1/3 md:right-15 uppercase bg-white text-black tracking-wide">SHOP NOW</span>
        </Link>
        <div className="p-3 mt-4">
            <h3 className="font-['Oswald'] text-2xl tracking-widest">NEW IN</h3>
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
        <Footer/>
        </>
    )
}