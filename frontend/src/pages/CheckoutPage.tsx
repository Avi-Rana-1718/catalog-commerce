import { useEffect, useState } from "react";
import Nav from "../components/user/Nav";

import { useNavigate } from "react-router";
import ItemPreview from "../components/user/ItemPreview";
import AddressAdd from "../components/user/AddressAdd";
import { LuMapPinHouse, LuPlus, LuTrash } from "react-icons/lu";
import PrimaryBtn from "../components/ui/PrimaryBtn";

import toast, { Toaster } from 'react-hot-toast';

export default function CheckoutPage() {

    let navigate = useNavigate();
    
    const [shipping, setShipping] = useState(null);
    const [addAddress, setAddAddress] = useState(false)

    const [data] = useState(JSON.parse(localStorage.getItem("cart")))

    const [selectedAddress, setSelectedAddress] = useState(null)

    useEffect(()=>{
        if(localStorage.getItem("token")==null) {
            navigate("/auth")
        }
        if(addAddress==false) {
            fetch(`http://localhost:3030/address/all`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res=>res.json()).then(data=>{
                console.log(data);
                
                if(data.type=="SUCCESS")
                    setShipping(data.msg)
            })
        }
    }, [addAddress])

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
                {shipping?<form className="divide-y-2 divide-[#F3F3F3] border-y-2 mt-4 border-[#F3F3F3]">
                    {
                        shipping && shipping.map(((el, i)=>{
                            return (
                            <span className="border-x-2 border-[#F3F3F3] px-2 flex">
                                <input name="address" id={el.location+i} type="radio" onClick={()=>{
                                    setSelectedAddress({
                                        name: el?.name,
                                        address: el?.location,
                                        mobile: el?.mobile
                                    })
                                }}/>
                                <div className="ml-2 py-2">
                                    <label htmlFor={el.address+i}>
                                        <h5 className="font-semibold">{el?.name}</h5>
                                        <h4>{el?.location}</h4>
                                        <span>{el?.mobile}</span>
                                    </label>
                                    <button
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            fetch(`http://localhost:3030/address/delete?addressID=${el?.addressid}`, {
                                                method: "DELETE",
                                                headers: {
                                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                                                }
                                            }).then(res=>res.json()).then(data=>{
                                                console.log(data);

                                                if(data.type=="SUCCESS") {
                                                    setAddAddress(false)
                                                    toast.success(data.msg)
                                                } else {
                                                    toast.error(data.msg)
                                                }
                                                
                                            })
                                        }}
                                        className="mt-2 flex items-center hover:text-red-800 text-red-600 hover:underline cursor-pointer"
                                    >
                                        <LuTrash className="mr-1"/> Remove
                                    </button>
                                </div>
                            </span>
                            )
                        }))
                    }
                </form>:
                <div className="text-[#626161] p-4 border-2 border-[#F3F3F3] mt-4">
                    <LuMapPinHouse className="text-4xl mb-2"/>
                    <h3>No address found. Kindly add one!</h3>
                </div>
                }
                <button onClick={()=>{setAddAddress(true)}} className="uppercase flex items-center mt-3 cursor-pointer"><LuPlus className="text-xl mr-1"/> Add address</button>
                {addAddress && <AddressAdd setVisible={setAddAddress} toast={toast}/>}   
            </div>

            <div className="mt-4">
                <h2 className="text-2xl font-['Oswald'] my-4">PARCEL</h2>
                <div className="w-full border-2 border-[#F3F3F3] p-5">
                {
                    data && data.map(el=>{
                        return <ItemPreview id={el?.id} quantity={el.quantity} price={el?.price} options={el.options} />
                    })
                }
                </div>
            </div>

            <div className="mt-4">
                <h2 className="text-2xl font-['Oswald'] my-4">PAYMENT</h2>
                <h2 className="text-lg border-2 border-[#F3F3F3] p-5">Paying with <span className="underline">Cash on Delivery</span></h2>
            </div>

            <div className="p-3 md:w-1/3">
                <PrimaryBtn
                    disabled={!selectedAddress}
                    label={"COMPLETE PURCHASE"}
                    onClick={createOrder}
                />
                    
            </div>
        </div>
        <Toaster
                position="bottom-right"
                reverseOrder={false}
        />
        </>
    )
}