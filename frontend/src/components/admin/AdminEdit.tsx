import { LuTrash, LuX } from "react-icons/lu"
import Drawer from "../ui/Drawer"
import { useEffect, useState } from "react"
import Input from "../ui/Input"
import PrimaryBtn from "../ui/PrimaryBtn"
import PropertyPlayground from "../ui/PropertyPlayground"

export default function AdminEdit({productID, setVisible, toast}: {productID:number, setVisible:any, toast:any}) {

    const [name, setName] = useState(null)
    const [price, setPrice] = useState(null)
    const [discount, setDiscount] = useState(null)
    const [options, setOptions] = useState(null)
    const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        fetch(`http://localhost:3030/product/${productID}`).then(res=>res.json()).then(data=>{
           setName(data.msg?.name);
           setPrice(data.msg?.price);
           setDiscount(data.msg?.discount);
           setOptions(data?.msg.options);
           setCategories(data?.msg?.category||[])
           setIsLoading(false)

           console.log("DATA", data);
           
        })
    }, [isLoading])

    return (
        <Drawer>
            <>
            <div className="flex justify-between items-center text-4xl mb-10">
                <h4 className="font-['Oswald'] uppercase">Edit PRODUCT</h4>
                <LuX className="cursor-pointer" onClick={()=>{setVisible(false)}}/>
            </div>

            <div className="mt-4">
                <Input label="Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                <Input label="Price" type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
                <label htmlFor="discount" className="uppercase">Discount</label>
                <input id="discount" placeholder="10%" type="number" max="100"  className="border w-full border-[#dad8d8] focus:border-[#555] px-3 py-2 focus:outline-none block" value={discount} onChange={(e)=>{setDiscount(e.target.value)}}/>
                <label htmlFor="options" className="uppercase mt-2 block">Options</label>
                {options && <PropertyPlayground values={options} setValues={setOptions} />}


                <label htmlFor="categories" className="uppercase block mt-2">Categories</label>
                <ul className="flex gap-x-2">
                    {categories && categories.map((el, i)=>(
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
                            console.log(categories);
                            
                        }
                    }}    
                />
        
            </div>

            <PrimaryBtn
                label="CONFIRM"
                onClick={()=>{
                    fetch(`http://localhost:3030/admin/editProduct`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            productID: productID,
                            name: name,
                            price: price,
                            discount: discount,
                            options: options,
                            category: categories
                        })
                    }).then(res=>res.json()).then(data=>{
                        console.log(data);
                        if(data.type=="SUCCESS") {
                            setVisible(false)
                            setIsLoading(true)
                            toast.success("Product successfully editted!")
                        } else {
                            toast.error(data?.msg||"Unable to edit product!")
                        }
                        
                    })
                }}
            />
            </>
        </Drawer>
    )
}