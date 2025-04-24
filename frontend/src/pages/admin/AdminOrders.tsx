import { useEffect, useState } from "react";
import AdminNav from "../../components/admin/AdminNav";
import AdminSidenav from "../../components/admin/AdminSidenav";
import AdminAdd from "../../components/admin/AdminAdd";
import OrderItem from "../../components/admin/OrderItem";

export default function AdminOrders() {
    const [data, setData] = useState(null)
    const [addVisible, setAddVisible] = useState(false)

    const [query, setQuery] = useState("")
    const [queryStatus, setQueryStatus] = useState(null)

    useEffect(()=>{
        fetch("http://localhost:3030/admin/orders", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res=>res.json()).then(data=>{
            setData(data.msg)
        })
    }, [])

    return (
        <>
        <AdminNav />
        <div className="p-4 flex">
            <AdminSidenav setAddVisible={setAddVisible}/>
            <div className="flex-1">
            <h3 className="text-6xl font-['Oswald'] uppercase">Orders</h3>
                <p className="text-[#666] mt-4">
                   A list of the orders received for your products:-
                </p>

                <div className="mt-4">
                    <label className="uppercase" htmlFor="search">Search by email</label>
                        <input id="search" placeholder="Search by email" value={query} onChange={(e)=>setQuery(e.target.value)} className="border w-full border-[#dad8d8] focus:border-[#555] px-3 py-2 focus:outline-none block"/>
                        <div className="mt-4">
                            <input id="confirmed" name="status" type="radio" value="Confirmed" checked={queryStatus=="Confirmed"} onChange={(e)=>setQueryStatus(e.target.value)}/>
                            <label htmlFor="confirmed" className="ml-1 mr-2">Confirmed</label>
                            <input id="cancelled" name="status" type="radio" value="Cancelled" checked={queryStatus=="Cancelled"} onChange={(e)=>setQueryStatus(e.target.value)}/>
                            <label htmlFor="cancelled" className="ml-1 mr-2">Cancelled</label>
                        </div>
                </div>

            <ul className="">
                {data && data.filter(el=>((el.orderedby.includes(query.toLowerCase())))).filter((el)=>el.status==queryStatus || queryStatus==null).map((el)=>(
                    <OrderItem key={el?.orderid} orderID={el?.orderid} orderBy={el?.orderedby} orderAt={el?.orderedat} items={el?.items} address={el?.address} status={el?.status}/>
                ))}
            </ul>
            </div>
        </div>
            {addVisible && <AdminAdd setVisible={setAddVisible}/>}
        </>
    )
}