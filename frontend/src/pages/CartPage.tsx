import { useEffect, useState } from "react"
import Nav from "../components/Nav"
import CartItem from "../components/CartItem"
import { Link } from "react-router";

export default function CartPage() {
    
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
            <h3 className="text-6xl font-['Oswald']">CART</h3>
            <div className="flex justify-between">
                <ul className="mt-12 flex-1">
                {
                    data && data.map((el:any)=>{
                        return <CartItem key={el?.id} id={el?.id} quantity={el?.quantity} options={el?.options} maxStock={el?.maxStock} setTotal={setTotal}/>
                    })
                }
                </ul>

                <div className="w-1/3 mt-16">
                    <table className="w-full">
                        <tbody>
                        <tr>
                            <td>Order value</td>
                            <td className="text-right font-bold">Rs. {(total).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>
                                Deliver fee
                            </td>
                            <td className="font-bold text-right">
                                FREE
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold mt-3 block">
                                TOTAL
                            </td>
                            <td className="font-bold text-right">
                                Rs. {(total).toFixed(2)}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <Link to="/checkout"
                        className="bg-[#000] block text-center text-white px-10 py-2 mt-5 w-full hover:bg-[#555] cursor-pointer"
                    >
                        CONTINUE TO CHECKOUT
                    </Link>
                </div>
            </div>

        </div>
        </>
    )
}