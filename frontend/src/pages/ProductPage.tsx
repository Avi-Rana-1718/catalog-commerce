import { useNavigate, useParams } from "react-router"
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import OptionsItems from "../components/OptionsItems";
import { LuHeart, LuLoaderCircle } from "react-icons/lu";
import ProductMisc from "../components/ProductMisc";
import Footer from "../components/Footer";

export default function ProductPage() {
    const params = useParams()
    const navigate = useNavigate();
    
    const [data, setData] = useState<any>(null);
    const [options, setOptions] = useState<any>({})
    const [maxStock, setMaxStock] = useState(NaN)

    useEffect(()=>{
        if(options.hasOwnProperty("size")) {
            let obj = options;
            delete obj.size;
            setOptions(obj)
        }
        fetch(`http://localhost:3030/product/${params.id}`).then(res=>res.json()).then(data=>{
            console.log(data);
            data.msg.images.splice(0, 1)
            setData(data.msg)
        })
    }, [params.id])


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
    <div className="flex">
        <div className="grid grid-cols-2 w-1/2">
            {
                data?.images.map((el, i)=>(
                    <img
                        src={el}
                        className={i==0||i>2?"col-span-2":null}
                    />
                ))
            }
        </div>
        <div className="p-10 md::p-36 flex-1 w-1/2 ml-16">
            <div className="sticky top-20">
            <div className="flex w-full justify-between">
                <div>
                    <h3 className="text-2xl uppercase">{data?.name}</h3>
                    <span className="text-xl font-bold block">Rs. 
                        {data?.discount>0?(
                            <>
                            <span>{(data?.price-data?.price*(data?.discount/100)).toFixed(2)}</span>
                            <small className="ml-2 text-[#666] line-through">{(data?.price).toFixed(2)}</small>
                            </>
                    ):((data?.price).toFixed(2))}
                    </span>
                    <span>MRP inclusive of all taxes</span>
                </div>
                <LuHeart className="ml-32 text-xl cursor-pointer"/>
            </div>

            {/* OPTIONS */}
            {
            Object.keys(data.options).reverse().map((el)=>{
            return (
                <div key={el}>
                    <h3 className="text-md uppercase mt-10">
                        {options[el]!=undefined?<>SELECTED {el}: {options[el]}</>:<>{el}:</>}
                    </h3>
                    <ul className="flex mt-3 border-l border-gray-300">
                        {
                            data.options[el].map((element:any)=>(
                               <OptionsItems data={element} key={element?.id || element?.name} callback={(k, maxStock=-1)=>{
                               
                                    let obj = {...options};
                                    obj[el]=k;
                                    if(maxStock!=-1) {
                                    setMaxStock(maxStock)
                                    }
                                    setOptions(obj)
                                    console.log(options)
                                }}/>
                            ))
                        }
                    </ul>
                </div>
            )
            })
            }

            <button
                onClick={()=>{
                     if(Object.keys(options).length!=Object.keys(data.options).length) {
                        alert("Select all the options!")
                        return;
                    }

                    let nData = JSON.parse(localStorage.getItem("cart"));
                    let existIndex = nData!=null?nData.findIndex(el=>el.id==params.id && !Object.keys(el.options).map(key=>{
                            return el.options[key]==options[key]
                    }).includes(false)):-1;
                    
                    let obj = {
                        id:params.id,
                        quantity: 1,
                        maxStock:maxStock,
                        price: (data?.price-data?.price*(data?.discount/100)).toFixed(2),
                        options: options
                    }

                    if(nData==null) {
                        localStorage.setItem("cart", JSON.stringify([obj]));
                    } else if(existIndex==-1) {
                        nData.push(obj)
                        localStorage.setItem("cart", JSON.stringify(nData));
                    } else {
                        nData[existIndex].quantity++;
                        localStorage.setItem("cart", JSON.stringify(nData));
                    }

                    navigate("/cart")
                }}
                className="bg-[#000] text-white px-10 py-2 mt-9 w-full disabled:bg-[#555555] disabled:cursor-not-allowed hover:bg-[#555555] cursor-pointer"
            >
                ADD
            </button>
            
            <div>
                <ProductMisc description={data?.description}/>
            </div>
            </div>
        </div>
    </div>
    <Footer/>
    </>
)
}