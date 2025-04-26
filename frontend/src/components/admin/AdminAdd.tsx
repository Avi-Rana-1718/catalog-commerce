import { useState } from "react";
import AdminSidenav from "./AdminSidenav";
import AdminNav from "./AdminNav";
import Drawer from "../ui/Drawer";
import { LuX } from "react-icons/lu";
import Input from "../ui/Input";
import PrimaryBtn from "../ui/PrimaryBtn";
import PropertyPlayground from "../ui/PropertyPlayground";

export default function AdminAdd({setVisible, toast}) {

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("")
    const [options, setOptions] = useState({size: [
        {name: "S", stock: 10},
        {name: "M", stock: 10},
        {name: "L", stock: 10},
        {name: "XL", stock: 10},
        {name: "XXL", stock: 10}
    ]})
    const [categories, setCategories] = useState("")

    const [price, setPrice] = useState(0);
    const [images, setImages] = useState<any>([]);

    console.log(name.length);
    

    return <Drawer>
        <div>
            <div className="flex justify-between items-center text-4xl mb-10">
                <h4 className="font-['Oswald'] uppercase">CREATE PRODUCT</h4>
                <LuX className="cursor-pointer" onClick={()=>{setVisible(false)}}/>
            </div>
            
            <div className="">
                <Input placeholder="Name" label="Name" value={name} onChange={(e)=>setName(e.target.value)} />
                <Input placeholder="Description" label="Description" value={desc} onChange={(e)=>setDesc(e.target.value)}/>
                
                <label htmlFor="options" className="uppercase mt-2 block">Options</label>
                <PropertyPlayground values={options} setValues={setOptions}/>

                <Input placeholder="Categories" label="Categories" value={categories} onChange={(e)=>setCategories(e.target.value)} />
                <Input placeholder="Price" label="Price" type="number" onChange={(e)=>setPrice(Number(e.target.value))} />
                <textarea placeholder="Images" onChange={(e)=>setImages(e.target.value)} className="border w-full border-[#666] mt-2 px-3 py-2 focus:outline-none block"></textarea>
                <PrimaryBtn
                    label="ADD"
                    disabled={name.length==0 || desc.length==0 || categories.length==0 || price==0}
                    onClick={()=>{                
                        fetch(`http://localhost:3030/admin/addProduct`, {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                name: name,
                                description: desc,
                                price: price,
                                options: options,
                                discount: 0,
                                images: JSON.parse(images)
                            })
                        }).then(res=>res.json()).then(data=>{
                            console.log(data);
                            setVisible(false)
                            if(data?.type=="SUCCESS") {
                                toast.success(data?.msg)
                            } else {
                                toast.error(data?.msg)
                            }
                        })
                    }}
                    />
            </div>
        </div>
    </Drawer>
}