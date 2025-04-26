import { LuX } from "react-icons/lu";
import Drawer from "../ui/Drawer";
import { useState } from "react";
import Input from "../ui/Input";
import PrimaryBtn from "../ui/PrimaryBtn";

export default function CouponAdd({setVisible, toast}) {

    const [code, setCode] = useState("")
    const [discount, setDiscount] = useState(0)
    const [expiresat, setExpiresAt] = useState(null);
    const [maxUses, setMaxUses] = useState(0)

    return (
        <Drawer>
            <div className="flex justify-between items-center text-4xl mb-10">
                <h4 className="font-['Oswald'] uppercase">CREATE COUPON</h4>
                <LuX className="cursor-pointer" onClick={()=>{setVisible(false)}}/>
            </div>

            <div className="">
                <Input placeholder="Code" label="Code" value={code} onChange={(e)=>setCode(e.target.value)}/>
                <Input placeholder="Discount" label="Discount" type="number" onChange={(e)=>setDiscount(Number(e.target.value))}/>
                <Input placeholder="Max uses" label="Max uses" type="number" onChange={(e)=>setMaxUses(Number(e.target.value))} />
                <Input type="datetime-local" label="Expires at" value={expiresat} onChange={(e)=>setExpiresAt(e.target.value)} />
                
                <PrimaryBtn
                    label="ADD" 
                    onClick={()=>{                
                        fetch(`http://localhost:3030/coupon/create`, {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                coupon: code,
                                maxUses: maxUses,
                                expiresAt: expiresat,
                                discount: discount
                            })
                        }).then(res=>res.json()).then(data=>{
                            console.log(data);
                            setVisible(false)
                            if(data.type=="SUCCESS") {
                                toast.success(data?.msg)
                            } else {
                                toast.error(data?.error)
                            }
                        })
                    }}
                    />
            </div>
            
        </Drawer>
    )
}