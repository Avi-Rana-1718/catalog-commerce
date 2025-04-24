import { useState } from "react";
import AdminSidenav from "./AdminSidenav";
import AdminNav from "./AdminNav";
import Drawer from "../ui/Drawer";
import { LuX } from "react-icons/lu";

export default function AdminAdd({setVisible}) {

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("")
    const [options, setOptions] = useState({})
    const [categories, setCategories] = useState("")

    const [price, setPrice] = useState(0);
    const [images, setImages] = useState<any>([]);

    return <Drawer>
        <div>
            <div className="flex justify-between items-center text-4xl mb-10">
                <h4 className="font-['Oswald'] uppercase">CREATE</h4>
                <LuX className="cursor-pointer" onClick={()=>{setVisible(false)}}/>
            </div>
            
            <div className="">
                <label htmlFor="name" className="uppercase">Name</label>
                <input placeholder="Name" id="name" value={name} onChange={(e)=>setName(e.target.value)} className="border w-full border-[#666] px-3 py-2 focus:outline-none block"/>
                <label htmlFor="desc" className="uppercase mt-2 block">Description</label>
                <input placeholder="Description" id="desc" value={desc} onChange={(e)=>setDesc(e.target.value)} className="border w-full border-[#666] px-3 py-2 focus:outline-none block"/>
                
                <label htmlFor="options" className="uppercase mt-2 block">Options</label>
                <textarea placeholder="Options" id="options" onChange={(e)=>setOptions(e.target.value)} className="border w-full border-[#666] px-3 py-2 focus:outline-none block"></textarea>
                
                <label htmlFor="cat" className="uppercase mt-2 block">Categories</label>
                <input placeholder="Categories" id="cat" value={categories} onChange={(e)=>setCategories(e.target.value)} className="border w-full border-[#666] px-3 py-2 focus:outline-none block"/>
                <label htmlFor="price" className="uppercase mt-2 block">Price</label>
                <input placeholder="Price" id="price" type="number" onChange={(e)=>setPrice(Number(e.target.value))} className="border w-full border-[#666] px-3 py-2 focus:outline-none block uppercase"/>
                <textarea placeholder="Images" onChange={(e)=>setImages(e.target.value)} className="border w-full border-[#666] mt-2 px-3 py-2 focus:outline-none block"></textarea>
                <button 
                    className="bg-[#000] w-full block text-center text-white px-10 py-2 mt-5 hover:bg-[#555] cursor-pointer"
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
                                images: JSON.parse(images),
                                // categories: JSON.parse(categories)
                            })
                        }).then(res=>res.json()).then(data=>{
                            console.log(data);
                        })
                    }}>ADD</button>
            </div>
        </div>
    </Drawer>
}