import { useEffect, useState } from "react";
import Nav from "../components/user/Nav";
import OrderItem from "../components/user/OrderItem";
import { Link } from "react-router";
import AccountNav from "../components/user/AccountNav";
import Pagination from "../components/ui/Pagination";

export default function OrdersPage() {

    const [data, setData] = useState([])
    const [pages, setPages] = useState(0)

    useEffect(()=>{
        fetch(`http://localhost:3030/order/all/?page=1`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            setData(data.msg.rows)    
            setPages(data.msg.totalCount)        
        })
    }, [])
    

    return (
        <>
        <Nav/>
        <div className="p-4 md:flex">
            <div className="hidden md:block">
                <AccountNav />
            </div>
            <div className="md:p-4 w-full">
                <h4 className="text-5xl mt-4 uppercase font-['Oswald'] mb-5">ORDERS</h4>
                <ul>
                    {data && data.map((el)=>{
                        return <OrderItem key={el?.orderid} orderID={el?.orderid} orderedAt={el?.orderedat} items={el?.items} address={el?.address} status={el?.status}/>
                    })}
                </ul>
                <Pagination numberOfPages={4} currPage={1}/>
            </div>
        </div>
        </>
    )
}