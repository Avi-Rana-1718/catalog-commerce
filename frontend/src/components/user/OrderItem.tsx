import ItemPreview from "./ItemPreview";
import { useNavigate } from "react-router";
import { LuCircleCheck, LuCircleX } from "react-icons/lu";
import toast, { Toaster } from 'react-hot-toast';

interface OrderItemProps {
    address:{name:string, address:string, mobile:string},
    orderedAt:string,
    orderID:string,
    items:[any],
    status:string
}

export default function OrderItem({address, orderedAt, orderID, items, status}:OrderItemProps) {
    const router = useNavigate()
    const date = new Date(orderedAt)

    return (
        <li className="border-2 border-[#F3F3F3] my-2 md:m-2 rounded">
            <div className="bg-[#F0F2F2] flex justify-between p-3">
                <h5>
                    Ordered at
                    <span className="ml-1">{date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear() + " - " + date.getHours()+":"+date.getMinutes()}</span>
                </h5>
                <span>
                    OrderID: <small>{orderID}</small>
                </span>
            </div>
            <div className="p-3">
                <h3 className="text-2xl flex items-center uppercase font-['Oswald'] mb-2">
                    {status=="Confirmed"?<LuCircleCheck className="inline mr-1 text-[#008000]"/>:<LuCircleX className="inline mr-1 text-red-500"/>}
                    {status}
                </h3>
                { status!="Cancelled" && (
                <>
                    <span className="block">Delivering to {address?.name}</span>
                    <small className="text-[#282828]">{address?.address} | {address?.mobile}</small>
                </>
                )}
                <h4 className="mt-3 text-lg text-[#555] font-semibold uppercase" >Items [{items.length}]</h4>
                <ul className="mt-1 border-t-2 border-[#F3F3F3] pt-3">
                    {items.map((el)=>{
                        return <ItemPreview id={el?.id} options={el?.options} price={el?.price} quantity={el?.quantity} key={el?.id}/>
                    })}
                </ul>
            </div>
            {status!="Cancelled" && <div className="flex justify-end border-t-2 border-[#F3F3F3] p-3">
                    <span
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={()=>{
                            fetch(`http://localhost:3030/order/cancel?orderID=${orderID}`, {
                                method: "DELETE",
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                                }
                            }).then(res=>res.json()).then(data=>{
                                console.log(data);
                                if(data.type=="SUCCESS") {
                                    router(0)
                                } else {
                                    toast.error(data?.msg)
                                }
                            })
                        }}
                    >
                        Cancel order
                    </span>
            </div>}
            <Toaster
                position="bottom-right"
                reverseOrder={false}
                />
        </li>
    )
}