import { useState } from "react";
import AdminSidenav from "./AdminSidenav";
import AdminNav from "./AdminNav";
import Drawer from "../ui/Drawer";
import { LuFileImage, LuImagePlus, LuTrash, LuX } from "react-icons/lu";
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
    const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState("")

    const [price, setPrice] = useState(0);
    const [images, setImages] = useState<any>([]);   

    return <Drawer>
        <div>
            <div className="flex justify-between items-center text-4xl mb-10">
                <h4 className="font-['Oswald'] uppercase">CREATE PRODUCT</h4>
                <LuX className="cursor-pointer" onClick={()=>{setVisible(false)}}/>
            </div>
            
            <div className="">
                <Input placeholder="Name" label="Name" value={name} onChange={(e)=>setName(e.target.value)} />
                <Input placeholder="Description" label="Description" value={desc} onChange={(e)=>setDesc(e.target.value)}/>
                
                <label htmlFor="options" className="uppercase mt-2  mb-1 block">Options</label>
                <PropertyPlayground values={options} setValues={setOptions}/>


                <label htmlFor="categories" className="uppercase block mt-2">Categories</label>
                <ul className="flex gap-x-2">
                    {categories.map((el, i)=>(
                        <li
                            key={el+i}
                            className="group bg-[#EAEAEA] px-2 py-1 rounded cursor-pointer hover:underline flex items-center"
                            onClick={()=>{
                                let obj = [...categories];
                                obj=obj.filter((key)=>key!=el);
                                setCategories(obj)
                            }}
                        >
                            <span>{el}</span>
                            <LuTrash className="hidden group-hover:inline ml-1 text-red-700"/>
                        </li>
                    ))}
                </ul>
                <input 
                    id="categories"
                    autoComplete="off"
                    value={newCategory}
                    onChange={(e)=>{setNewCategory(e.target.value)}}
                    className="border w-full border-[#dad8d8] focus:border-[#555] mt-1 px-3 py-2 focus:outline-none block"
                    onKeyDown={(e)=>{
                        if(e.key=="Enter") {
                            setCategories([...categories, newCategory])
                            setNewCategory("")
                        }
                    }}    
                />
        


                <Input placeholder="Price" label="Price" type="number" onChange={(e)=>setPrice(Number(e.target.value))} />
                <label className=" mt-2 uppercase flex items-center">IMAGES</label>
                    <div className="flex gap-x-2 overflow-y-scroll">
                        <ul className="flex">
                            {images.length>0 && 
                                images.map((el)=>(
                                    <li className="group relative flex justify-center items-center w-30 h-40 cursor-pointer"
                                    onClick={()=>{
                                        let obj = images;
                                        obj=obj.filter(url=>url!=el);
                                        setImages(obj)
                                    }}>
                                        <img
                                            className="h-40 w-30 drop-shadow-xl absolute"
                                            src={el}
                                        />
                                        <LuTrash className="hidden group-hover:block text-xl z-50 text-red-700"/>
                                    </li>
                                ))
                            }
                            </ul>
                    </div>
                <label htmlFor="image" className=" mt-1 cursor-pointer flex items-center"><LuImagePlus className="mr-1"/>Upload</label>
                <input id="image" className="hidden" type="file" accept="image/*" onChange={(e)=>{
                     let formData = new FormData()
                     formData.append("file", e.target.files[0]);
                     fetch("http://localhost:3030/product/uploadImage", {
                         method: "POST",
                         body: formData,
                         headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                         }
                     }).then(res=>res.json()).then(data=>{
                        console.log(data);
                        
                         if(data.type=="SUCCESS") {
                             setImages([...images, data.msg]);
                             console.log(images);
                             
                         }  
                     })
                }}/>
                
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
                                category: categories,
                                images: images
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