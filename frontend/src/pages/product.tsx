import { useNavigate, useParams } from "react-router"
import Nav from "../components/Nav";
import { useEffect, useState } from "react";

export default function Product() {
    const params = useParams()
    const navigate = useNavigate();
    
    const [data, setData] = useState<any>(null);

    useEffect(()=>{
        fetch(`http://localhost:3030/product/${params.id}`).then(res=>res.json()).then(data=>{
            console.log(data);
            setData(data[0])
            
        })
    }, [])


    if(!data) {
        return <>Loading</>
    }
    
    return (
        <>
        <Nav />
        <div className="flex">
            <img
                    src={data?.images[0]}
                    className="w-1/3"
            />
            <div className="p-4">
                <h3 className="text-2xl">{data?.name}</h3>
                <span className="text-xl text-[#6F48EC] font-semibold">$
                    {data?.discount>0?(
                        <>
                        <span>{(data?.price-data?.price*(data?.discount/100)).toFixed(2)}</span>
                        <small className="ml-2 text-[#5539b3] line-through">{(data?.price).toFixed(2)}</small>
                        </>
                ):((data?.price).toFixed(2))}
                </span>
                <span className="block mt-3 w-1/2">
                    {data?.description}
                </span>

                <button
                    onClick={()=>{
                        let data = JSON.parse(localStorage.getItem("cart"));

                        if(data &&  
                            data.find((el)=>el.id==params.id)) {
                            navigate("/cart")
                            return;
                        }

                        if(data==null) {
                            localStorage.setItem("cart", JSON.stringify([{id:params.id, quantity: 1}]));
                        } else {
                            data.push({id:params.id, quantity: 1})
                            localStorage.setItem("cart", JSON.stringify(data));
                        }

                        navigate("/cart")
                    }}
                    className="bg-[#6F48EC] text-white px-8 py-2 mt-5 rounded hover:underline cursor-pointer"
                >
                    {localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart")).find((el)=>el.id==params.id)?"Already in cart!":"Add to cart"}
                </button>
            </div>
        </div>
        </>
    )
}