import { LuX } from "react-icons/lu"
import Drawer from "../ui/Drawer"
import { useEffect, useState } from "react"

export default function AdminEdit({productID, setVisible}: {productID:number, setVisible:any}) {

    const [name, setName] = useState(null)
    const [price, setPrice] = useState(null)
    const [discount, setDiscount] = useState(null)
    const [stock, setStock] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        fetch(`http://localhost:3030/product/${productID}`).then(res=>res.json()).then(data=>{
           setName(data.msg?.name);
           setPrice(data.msg?.price);
           setDiscount(data.msg?.discount);
           setStock(data?.msg.stock);
           setIsLoading(false)
        })
    }, [isLoading])

    return (
        <Drawer>
            <>
            <div className="flex justify-between items-center text-4xl mb-10">
                <h4 className="font-['Oswald'] uppercase">Edit</h4>
                <LuX className="cursor-pointer" onClick={()=>{setVisible(false)}}/>
            </div>

            <div className="mt-4">
                <label htmlFor="name" className="uppercase">Name</label>
                <input id="name" className="border border-[#666] p-1 w-full mb-3 focus:outline-none block" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                <label htmlFor="price" className="uppercase">Price</label>
                <input id="price" type="number" className="border border-[#666] p-1 w-full mb-3 focus:outline-none block" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
                <label htmlFor="discount" className="uppercase">Discount</label>
                <input id="discount" type="number" max="100" className="border border-[#666] p-1 w-full mb-3 focus:outline-none block" value={discount} onChange={(e)=>{setDiscount(e.target.value)}}/>
                <label htmlFor="stock" className="uppercase">Stock</label>
                <input id="stock" type="number" className="border border-[#666] p-1 w-full mb-3 focus:outline-none block" value={stock} onChange={(e)=>{setStock(e.target.value)}}/>
            </div>

            <button
                className="bg-[#000] w-full block text-center text-white px-10 py-2 mt-5 hover:bg-[#555] cursor-pointer"
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
                            stock: stock
                        })
                    }).then(res=>res.json()).then(data=>{
                        console.log(data);
                        if(data.type=="SUCCESS") {
                            setVisible(false)
                            setIsLoading(true)
                        }
                        
                    })
                }}
            >
                CONFIRM
            </button>
            </>
        </Drawer>
    )
}