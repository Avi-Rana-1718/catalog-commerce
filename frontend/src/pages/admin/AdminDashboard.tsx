import { useEffect, useState } from "react";
import ProductItem from "../../components/admin/ProductItem";
import AdminSidenav from "../../components/admin/AdminSidenav";
import AdminNav from "../../components/admin/AdminNav";

import AdminEdit from "../../components/admin/AdminEdit";
import { LuTrendingDown, LuTrendingUp } from "react-icons/lu";
import AdminAdd from "../../components/admin/AdminAdd";

export default function AdminDashboard() {

    const [data, setData] = useState([])
    const [stats, setStats] = useState({
        revenue: 0,
        revenueToday:0,
        total: 0,
        ordersToday: 0
    })

    const [drawerVisible, setDrawerVisible] = useState(false)
    const [editID, setEditID] = useState(null)
    const [editData, setEditData] = useState(null)

    const [query, setQuery] = useState("")

    const [addVisible, setAddVisible] = useState(false)
 
    useEffect(()=>{
        fetch("http://localhost:3030/admin/all", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            setData(data.msg)
        });

        fetch("http://localhost:3030/admin/stats", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            
            setStats(data.msg)
        })
    }, [])

    useEffect(()=>{
        fetch(`http://localhost:3030/product/${editID}`).then(res=>res.json()).then(data=>{
            setEditData(data.msg)
            
        })
        
    }, [editID])

    return (
    <>
        <AdminNav />
        <div className="p-4 flex">
            <AdminSidenav setAddVisible={setAddVisible}/>
            <div className="flex-1">
                <h3 className="text-6xl font-['Oswald'] uppercase">Dashboard</h3>
                <p className="text-[#666] mt-4">
                    Welcome to the Admin Panel! Here is a list of the items added by you:
                </p>

                <section className="flex gap-x-5 mt-5">
                    <div className="p-4 border-2 border-[#F3F3F3] rounded">
                        <h4>Total Revenue</h4>
                        <h2 className="text-4xl font-bold">Rs. {stats && (stats?.revenue).toFixed(2)}</h2>
                        <span className="text-[#666]">{stats!=null && stats?.revenueToday>0?<LuTrendingUp className="text-green-600 inline mr-1"/>:null}Rs. {stats && (stats.revenueToday).toFixed(2)} worth of sales today</span>
                    </div>
                    <div className="p-4 border-2 border-[#F3F3F3] rounded">
                        <h4>Total Orders</h4>
                        <h2 className="text-4xl font-bold">{stats && stats?.total}</h2>
                        <span className="text-[#666]">{stats!=null && stats?.ordersToday>0?<LuTrendingUp className="text-green-600 inline mr-1"/>:null}{stats && stats.ordersToday} orders today</span>

                    </div>
                </section>

                <div className="mt-4">
                    <label className="uppercase" htmlFor="search">Search by name</label>
                    <input id="search" placeholder="Search by name" value={query} onChange={(e)=>setQuery(e.target.value)} className="border w-full border-[#dad8d8] focus:border-[#555] px-3 py-2 focus:outline-none block"/>
                </div>

                <table className="w-full text-left mt-5">
                    <thead>
                        <tr className="uppercase">
                            <th>Product ID</th>
                            <th>Name</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {data.filter(el=>(el.name.toLowerCase()).includes(query.toLowerCase())).map(el=>{
                            let hasZeroStock=0;
                            Object.keys(el?.options).forEach(key=>{
                            el?.options[key].forEach(e=>{
                                if(e.hasOwnProperty("stock"))
                                    hasZeroStock+=e?.stock==0?1:0;
                            })
                            })
                           return <ProductItem name={el.name}thumbnail={el?.images[0]} productID={el.productid} key={el.productid} stock={hasZeroStock} openEdit={(id)=>{
                                setEditID(id)
                                setDrawerVisible(true)
                            }}/>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        {drawerVisible && <AdminEdit productID={editID} setVisible={setDrawerVisible}/>}
        {addVisible && <AdminAdd setVisible={setAddVisible}/>}
    </>
    )
}