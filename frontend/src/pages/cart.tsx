import { useEffect, useState } from "react"
import Nav from "../components/Nav"
import CartItem from "../components/CartItem"
import { Link } from "react-router";

export default function Cart() {
    
    const [data, setData] = useState(JSON.parse(localStorage.getItem("cart")))
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(0);

    useEffect(()=>{
        setData(JSON.parse(localStorage.getItem("cart")))
    }, [total])

    return (
        <>
        <Nav />
        <div className="p-4">
            <h3 className="text-2xl">Cart</h3>
            <table className="mt-4 w-full">
                <thead>
                    <tr>
                        <th className="p-3 border-2 border-[#F2F2F2]">
                            Preview
                        </th>
                        <th className="p-3 border-2 border-[#F2F2F2]">
                            Article
                        </th>
                        <th className="p-3 border-2 border-[#F2F2F2]">
                            Quantity
                        </th>
                        <th className="p-3 border-2 border-[#F2F2F2]">
                            Total
                        </th>
                    </tr>
                </thead>
            <tbody>
            {
                data && data.map((el:any)=>{
                    return <CartItem id={el?.id} quantity={el?.quantity} setTotal={setTotal} setQuantity={setQuantity}/>
                })
            }
            <tr className="p-3 border-2 border-[#F2F2F2]">
                <td></td>
                <td></td>
                <td className="text-center p-3 border-2 border-[#F2F2F2]">{quantity}</td>
                <td className="text-[#6F48EC] text-center font-bold p-3 border-2 border-[#F2F2F2]">${total}</td>
            </tr>
            </tbody>
            </table>

            <div className="flex justify-end">
                <Link to="/checkout"
                    className="bg-[#6F48EC] text-white px-8 py-2 mt-5 rounded hover:underline cursor-pointer"
                >
                    Proceed
                </Link>
            </div>

        </div>
        </>
    )
}