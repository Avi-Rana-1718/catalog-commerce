import { useState } from "react";
import Nav from "../components/Nav";

import { useNavigate } from "react-router";
import ItemPreview from "../components/ItemPreview";

export default function CheckoutPage() {

    let navigate = useNavigate();
    
    const [shipping, setShipping] = useState(JSON.parse(localStorage.getItem("shipping")));
    const [addAddress, setAddAddress] = useState(false)

    const [data] = useState(JSON.parse(localStorage.getItem("cart")))

    const [name, setName] = useState("");
    const [newAddress, setNewAddress] = useState("")
    const [mobile, setMobile] = useState("");

    const [selectedAddress, setSelectedAddress] = useState({})

    function createOrder() {
        let cartData = JSON.parse(localStorage.getItem("cart"));
        cartData.forEach(el=>{
            delete el.maxStock;
        });
        fetch("http://localhost:3030/order/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                items: JSON.stringify(cartData),
                address: selectedAddress
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data);

            if(data?.type=="SUCCESS") {
                localStorage.removeItem("cart");
                navigate("/orders")
            }
            
        })
    }

    console.log(data);
    
    return (
        <>
        <Nav />
        <div className="p-4">

            <div className="mt-4 flex-1">
                <h3 className="text-6xl font-['Oswald'] mb-8">CHECKOUT</h3>

                <h2 className="text-2xl font-['Oswald'] my-4">MY INFORMATION</h2>
                <h2 className="text-xl">Delivering to</h2>
                <small className="text-[#666]">Select a exisiting address or add a new one!</small>
                <form className="divide-y-2 divide-[#F3F3F3] border-y-2 mt-4 border-[#f3f3f3]">
                    {
                        shipping && shipping.map(((el, i)=>{
                            return (
                            <span className="border-x-2 border-[#F2F2F2] px-2 flex">
                                <input name="address" id={el.address+i} type="radio" onClick={()=>{
                                    setSelectedAddress({
                                        name: el?.name,
                                        address: el?.address,
                                        mobile: el?.mobile
                                    })
                                }}/>
                                <div className="ml-2 py-2">
                                    <label htmlFor={el.address+i}>
                                        <h5 className="font-semibold">{el?.name}</h5>
                                        <h4>{el?.address}</h4>
                                        <span>{el?.mobile}</span>
                                    </label>
                                    <button
                                        onClick={()=>{
                                            let data = JSON.parse(localStorage.getItem("shipping"));
                                            data=data.filter((obj)=>{
                                                return JSON.stringify(el)!=JSON.stringify(obj);
                                            })

                                            localStorage.setItem("shipping", JSON.stringify(data));
                                            setShipping(data)
            
                                        }}
                                        className="mt-2 block hover:text-[#666] underline cursor-pointer"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </span>
                            )
                        }))
                    }
                </form>
                <button
                    className="mt-2 block text-blue-500 cursor-pointer hover:underline"
                    onClick={()=>{
                        setAddAddress(!addAddress)
                    }}
                >
                    {/* MAKE THIS A DIALOG */}
                    Add a new address!
                </button>
                {
                    addAddress && (
                        <>
                        <div className="flex flex-col gap-y-2">
                            <input className="outline-blue-500 px-3 py-2 bg-[#F2F2F2] rounded" value={name} onChange={(e)=>setName(e.target.value)} placeholder="John Doe"/>
                            <input className="outline-blue-500 px-3 py-2 bg-[#F2F2F2] rounded" value={newAddress} onChange={(e)=>setNewAddress(e.target.value)} placeholder="House no. 123, Lane, City, Country"/>
                            <input className="outline-blue-500 px-3 py-2 bg-[#F2F2F2] rounded" value={mobile} onChange={(e)=>setMobile(e.target.value)} placeholder="+91 123456789"/>
                        </div>
                        <button
                            onClick={()=>{
                                let obj = {
                                    address: newAddress,
                                    name: name,
                                    mobile: mobile
                                }

                                if(localStorage.getItem("shipping")==null) {
                                    localStorage.setItem("shipping", JSON.stringify([obj]))
                                } else {
                                    let data = JSON.parse(localStorage.getItem("shipping"))
                                    data.push(obj);
                                    localStorage.setItem("shipping", JSON.stringify(data))
                                }
                                setNewAddress("");
                                setName("");
                                setMobile("")
                                setAddAddress(false)
                                setShipping(JSON.parse(localStorage.getItem("shipping")))
                            }}
                            className="px-3 py-2 mt-2 bg-slate-600 rounded text-white"
                        >
                            Add
                        </button>
                        </>
                    )
                }   
            </div>

            <div className="mt-4">
                <h2 className="text-2xl font-['Oswald'] my-4">PARCEL</h2>
                <div className="w-full border-2 border-[#F3F3F3] p-5">
                {
                    data.map(el=>{
                        return <ItemPreview id={el?.id} quantity={el.quantity} price={el?.price} options={el.options} />
                    })
                }
                </div>
            </div>

            <div className="mt-4">
                <h2 className="text-2xl font-['Oswald'] my-4">PAYMENT</h2>
                <h2 className="text-lg border-2 border-[#F3F3F3] p-5">Paying with <span className="underline">Cash on Delivery</span></h2>
            </div>

            <div className="p-3 w-1/3">
                <button
                    className="bg-[#000] block text-center text-white px-10 py-2 mt-5 w-full hover:bg-[#555] cursor-pointer"
                    onClick={createOrder}
                >
                    COMPLETE PURCHASE
                </button>
            </div>
        </div>
        </>
    )
}