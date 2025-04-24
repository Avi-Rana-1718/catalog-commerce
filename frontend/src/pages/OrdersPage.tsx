import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import OrderItem from "../components/OrderItem";
import { Link } from "react-router";
import AccountNav from "../components/AccountNav";

export default function OrdersPage() {

    const [data, setData] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:3030/order/all/`, {
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
        <div className="p-4 flex">
            <AccountNav />
            <div className="p-4 w-full">
                <h4 className="text-5xl mt-4 uppercase font-['Oswald'] mb-5">ORDERS</h4>
                <ul>
                    {data && data.map((el)=>{
                        return <OrderItem key={el?.orderid} orderID={el?.orderid} orderedAt={el?.orderedat} items={el?.items} address={el?.address} status={el?.status}/>
                    })}
                </ul>
            </div>
        </div>
        </>
    )
}