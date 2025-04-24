import { FaRegCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

import ItemPreview from "./ItemPreview";
import { useNavigate } from "react-router";

interface OrderItemProps {
    address:{name:string, address:string, mobile:string},
    orderedAt:string,
    orderID:string,
    items:[any],
    status:string
}

export default function OrderItem({address, orderedAt, orderID, items, status}:OrderItemProps) {
    const router = useNavigate()

    return (
        <li className="border-2 border-[#F3F3F3] m-2 rounded">
            <div className="bg-[#F0F2F2] flex justify-between p-3">
                <h5>
                    Ordered at
                    <span className="ml-1">{orderedAt}</span>
                </h5>
                <span>
                    OrderID: <small>{orderID}</small>
                </span>
            </div>
            <div className="p-3">
                <h3 className="font-semibold text-xl flex items-center">
                    {status=="Confirmed"?<FaRegCheckCircle className="inline mr-1 text-[#008000]"/>:<FaCircleXmark className="inline mr-1 text-red-500"/>}
                    {status}
                </h3>
                { status!="Cancelled" && (
                <>
                    <span className="block">Delivering to {address?.name}</span> 
                    <small className="text-[#282828]">{address?.address} | {address?.mobile}</small>
                </>
                )}
                <h4 className="mt-3 text-lg font-medium">Items ({items.length})</h4>
                <ul className="mt-1 border-t-2 border-[#F3F3F3] pt-3">
                    {items.map((el)=>{
                        return <ItemPreview id={el?.id} options={el?.options} price={el?.price} quantity={el?.quantity} key={el?.id}/>
                    })}
                </ul>
            </div>
            {status!="Cancelled" && <div className="flex justify-end border-t-2 border-[#F3F3F3] p-3">
                    <span className="text-blue-500 hover:underline cursor-pointer mr-3">
                        Change address
                    </span>
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
                                }
                            })
                        }}
                    >
                        Cancel order
                    </span>
            </div>}
        </li>
    )
}