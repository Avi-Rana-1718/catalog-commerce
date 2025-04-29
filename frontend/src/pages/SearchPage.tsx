import { useEffect, useState } from "react";
import Nav from "../components/user/Nav";
import ProductCard from "../components/user/ProductCard";
import { useSearchParams } from "react-router";
import { LuListFilter, LuShoppingBag } from "react-icons/lu";
import Filter from "../components/user/Filter";

enum filterType {
    low2High,
    high2Low
}

export default function SearchPage() {

    const [searchParams] = useSearchParams()

    const [data, setData] = useState(null);
    const [query] = useState(searchParams.get("name"))

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(10000)

    const [isLoading, setLoading] = useState(true)
    const [filterVisible, setFilterVisible] = useState(false)

    useEffect(()=>{
        setLoading(true)
        fetch(`http://localhost:3030/product/${searchParams.get("type")=="category"?`category/${query}`:`search?name=${query}`}`).then(res=>res.json()).then(data=>{
            console.log(data);
            if(data.type=="SUCCESS")
            setLoading(false)
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
                <h5 className="uppercase text-3xl font-bold">RESULTS [{data!=null?data.length:0}]</h5>
                <div className="flex justify-end mb-2">
                    <h3 onClick={()=>{setFilterVisible(true)}} className="font-bold cursor-pointer hover:underline text-lg mt-2 uppercase flex items-center text-[#555]">
                        Filter
                        <LuListFilter className="ml-1"/>
                    </h3>
                </div>

                {isLoading &&
                    <div className="flex flex-col justify-center items-center h-[80lvh] text-[#626161]">
                        <LuShoppingBag className="text-6xl mb-3 animate-bounce"/>
                        <h3>Getting results for your search!</h3>
                    </div>
                }

                <ul className="flex flex-wrap mt-5">
                {data && data.filter(el=>(el.price>=min && el.price<=max)).map((el:any)=>{
                        let totalStock=0;
                
                         Object.keys(el?.options).forEach(key=>{
                            el?.options[key].forEach(e=>{
                                totalStock+=typeof e?.stock === "number"?e?.stock:0;
                            })
                        })
                        
                    return <ProductCard name={el?.name} key={el?.productid} price={el?.price} discount={el?.discount} images={el?.images} id={el?.productid} stock={totalStock}/>
                })}
                </ul>

                {(!isLoading && data.length==0) &&
                       <div className="flex flex-col justify-center items-center h-[80lvh] text-[#626161]">
                       <LuShoppingBag className="text-6xl mb-3"/>
                       <h3>No results for your search!</h3>
                   </div>
                }
            </div>
                {filterVisible && <Filter setVisible={setFilterVisible} min={min} setMin={setMin} max={max} setMax={setMax}/>}
            </>
        )
}