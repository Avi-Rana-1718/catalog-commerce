import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import OrderItem from "../components/OrderItem";

export default function Orders() {

    const [data, setData] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:3030/order/get/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            setData(data.msg)            
        })
    }, [])
    

    return (
        <>
        <Nav/>
        <div className="p-4">
            <h3 className="text-2xl">Orders</h3>
            <ul>
                {data && data.map((el)=>{
                    return <OrderItem key={el?.orderid} orderID={el?.orderid} orderedAt={el?.orderedat} items={el?.items} address={el?.address} status={el?.status}/>
                })}
            </ul>
        </div>
        </>
    )
}