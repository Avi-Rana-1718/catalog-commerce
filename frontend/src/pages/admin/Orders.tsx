import { useEffect, useState } from "react";
import AdminNav from "../../components/admin/AdminNav";
import AdminSidenav from "../../components/admin/AdminSidenav";
import OrderItem from "../../components/admin/OrderItem";
import Input from "../../components/ui/Input";

export default function AdminOrders() {
    const [data, setData] = useState(null)
    const [stats, setStats] = useState(null)

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

        fetch("http://localhost:3030/admin/stats", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            
            if(data.type=="SUCCESS") {
                setStats(data.msg)
            }
        })

    }, [])



    return (
        <>
        <AdminNav />
        <div className="p-4 flex">
            <AdminSidenav />
            <div className="flex-1">
            <h3 className="text-6xl font-['Oswald'] uppercase">Orders</h3>
                <p className="text-[#666] mt-4">
                   A list of the orders received for your products:-
                </p>

                <section className="flex gap-x-5 mt-5">
                    <div className="p-4 border-2 border-[#F3F3F3] rounded">
                        <h4>Total confirmed</h4>
                        <h2 className="text-4xl font-bold text-green-700 mt-1">
                            {stats && stats?.confirmed}
                            <span className="text-[#666] text-lg ml-1">orders</span>
                        </h2>
                    </div>
                    <div className="p-4 border-2 border-[#F3F3F3] rounded">
                        <h4>Total cancelled</h4>
                        <h2 className="text-4xl font-bold text-red-700">
                            {stats && stats?.cancelled}
                            <span className="text-[#666] text-lg ml-1">orders</span>
                        </h2>
                    </div>
                </section>

                <div className="mt-4">
                        <Input label="Search by email" placeholder="Search by email" value={query} onChange={(e)=>setQuery(e.target.value)}/>
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
        </>
    )
}