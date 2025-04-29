import { useEffect, useState } from "react"
import Nav from "../components/user/Nav"
import CartItem from "../components/user/CartItem"
import { Link, useNavigate } from "react-router";
import { LuCircleCheck, LuCircleX, LuLoaderCircle, LuShoppingCart } from "react-icons/lu";
import PrimaryBtn from "../components/ui/PrimaryBtn";
import toast, { Toaster } from 'react-hot-toast';
import Footer from "../components/user/Footer";

export default function CartPage() {
    
    const [data, setData] = useState(JSON.parse(localStorage.getItem("cart")))
    const [total, setTotal] = useState(0);
    
    const [isCouponValid, setCouponValid] = useState(null);
    const [coupon, setCoupon] = useState("")
    const [discount, setDiscount] = useState(0);
    const [isCouponLoading, setCouponLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        setData(JSON.parse(localStorage.getItem("cart")))
    }, [total])

    return (
        <>
        <Nav />
        <div className="p-4">
            <h3 className="text-6xl font-['Oswald']">CART</h3>
            <div className="flex flex-col-reverse md:flex-row justify-between">
                <ul className="mt-12 flex-1">

                {(data==null||data.length==0) &&
                    <div className="flex flex-col justify-center items-center h-full text-[#626161]">
                        <LuShoppingCart className="text-6xl mb-3"/>
                        <h3>Your cart is empty!</h3>
                    </div>
                }

                {
                    data && data.map((el:any)=>{
                        return <CartItem key={el?.id+Object.keys(el?.options).map(key=>(key+":"+el?.options[key])).toString()} id={el?.id} quantity={el?.quantity} options={el?.options} maxStock={el?.maxStock} setTotal={setTotal}/>
                    })
                }
                </ul>

                <div className="md:w-1/3 mt-16">

                    <div className="mb-2">
                        <label htmlFor="coupon">COUPON</label>
                        <div className="flex">
                        <input id="coupon" value={coupon} autoComplete="off" onChange={(e)=>setCoupon(e.target.value)} className="border w-full border-[#dad8d8] focus:border-[#555] px-3 py-2 focus:outline-none block"/>
                        <button
                            disabled={isCouponLoading}
                            className="hover:bg-[#666] bg-[#000] px-4 py-2 text-white flex items-center justify-center cursor-pointer ml-2 disabled:bg-[#666]"
                            onClick={()=>{
                                setCouponLoading(true)
                                fetch(`http://localhost:3030/coupon/valid?code=${coupon}`).then(res=>res.json()).then(data=>{
                                    console.log(data);
                                        setCouponValid(data)
                                        setCouponLoading(false)
                                    if(data.type=="SUCCESS") {
                                        setDiscount(data.data)
                                        localStorage.setItem("coupon", coupon)
                                        toast.success("Discount applied.")
                                    } else {
                                        setDiscount(0)
                                        localStorage.removeItem("coupon")
                                        toast.error(data.msg)
                                    }
                                    
                                })
                            }}
                        >
                            {isCouponLoading && <LuLoaderCircle className="animate-spin mr-1"/>} ADD
                            </button>
                        </div>
                        {isCouponValid && (isCouponValid.type=="SUCCESS"?<span className="text-green-600 flex items-center"><LuCircleCheck className="mr-1"/>{isCouponValid.msg}! Discount of Rs. {discount} has been applied. </span>:<span className="text-red-600 flex items-center"><LuCircleX className="mr-1"/>{isCouponValid?.msg}</span>)}
                    </div>

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
                        {discount>0 && <tr className="text-red-500">
                            <td>Discount</td>
                            <td className="font-bold text-right">
                                -Rs. {discount}
                            </td>
                        </tr>}
                        <tr>
                            <td className="font-semibold mt-3 block">
                                TOTAL
                            </td>
                            <td className="font-bold text-right">
                                Rs. {total-discount<0?"FREE":(total-discount).toFixed(2)}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <PrimaryBtn
                        label="CONTINUE TO CHECKOUT"
                        disabled={data==null||data.length==0}
                        onClick={()=>{
                            navigate("/checkout")
                        }}
                    />
                </div>
            </div>
        </div>
        <Toaster
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
                className:"text-xl"
            }}
        />
        </>
    )
}