import { LuX } from "react-icons/lu";
import Drawer from "../ui/Drawer";
import { useState } from "react";
import Input from "../ui/Input";

export default function AddressAdd({setVisible, toast}) {

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [mobile, setMobile] = useState("")

    return (
        <Drawer>
            <div className="flex justify-between items-center text-4xl mb-10">
                <h4 className="font-['Oswald'] uppercase">ADD NEW ADDRESS</h4>
                <LuX className="cursor-pointer" onClick={()=>{setVisible(false)}}/>
            </div>

            <div>
            <Input type="text" label={"NAME"} value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <Input type="text" label="location" value={location} onChange={(e)=>{setLocation(e.target.value)}}/>
            <Input type="text" label="mobile" value={mobile} onChange={(e)=>{setMobile(e.target.value)}}/>
            <button 
                    className="bg-[#000] w-full block text-center text-white px-10 py-2 mt-5 hover:bg-[#555] cursor-pointer"
                    onClick={()=>{                
                        fetch(`http://localhost:3030/address/create`, {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                name: name,
                                location: location,
                                mobile: mobile
                            })
                        }).then(res=>res.json()).then(data=>{
                            console.log(data);
                            setVisible(false)
                            if(data.type=="SUCCESS") {
                                toast.success(data.msg)
                            } else {
                                toast.error(data.msg)
                            }
                        })
                    }}>ADD</button>
            </div>
        </Drawer>
    )
}