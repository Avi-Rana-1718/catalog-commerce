import { useEffect, useState } from "react";
import AdminNav from "../../components/admin/AdminNav";
import AdminSidenav from "../../components/admin/AdminSidenav";
import { LuPlus, LuTrash } from "react-icons/lu";
import CouponAdd from "../../components/admin/CouponAdd";
import Input from "../../components/ui/Input";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router";

export default function AdminCoupons() {
    const [data, setData] = useState(null)
    const [couponVisible, setCouponVisible] = useState(false);

    const [query, setQuery] = useState("")

    const navigate = useNavigate()

    useEffect(()=>{
        fetch("http://localhost:3030/coupon/all", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            if(data.type=="SUCCESS")
                setData(data.msg)
        })
    }, [])

    return (
        <>
        <AdminNav />
        <div className="p-4 flex">
            <AdminSidenav/>
            <div className="flex-1">
            <h3 className="text-6xl font-['Oswald'] uppercase">COUPONS</h3>
                <p className="text-[#666] mt-4">
                   A list of the coupons created by you:-
                </p>

                <div className="mt-4">
                    <label className="uppercase" htmlFor="search">Search by name</label>
                    <div className="flex">
                        <Input placeholder="Search by name" value={query} onChange={(e)=>setQuery(e.target.value)}/>
                        <button className="hover:bg-[#666] bg-[#000] px-4 py-1 ml-2 text-white rounded flex items-center justify-center cursor-pointer" onClick={()=>{
                            setCouponVisible(true)
                        }}>
                            <LuPlus/>
                        </button>
                    </div>
                </div>

                <table className="w-full mt-4 text-left">
                    <thead>
                        <tr className="uppercase">
                            <th>NAME</th>
                            <th>Expires on</th>
                            <th>DISCOUNT</th>
                            <th>Uses</th>
                            <th>Max Uses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.filter((el)=>el.code.includes(query)).map(el=>(
                            <tr>
                                <td>{el?.code}</td>
                                <td>{el?.expiresat}</td>
                                <td>{el?.discount}</td>
                                <td>{el?.uses}</td>
                                <td>{el?.maxuses}</td>
                                <td 
                                className="cursor-pointer"
                                onClick={(e)=>{
                                    fetch(`http://localhost:3030/coupon/delete?code=${el.code}`, {
                                        method: "DELETE",
                                        headers: {
                                            Authorization: `Bearer ${localStorage.getItem("token")}`
                                        }
                                    }).then(res=>res.json()).then(data=>{
                                        console.log(data);
                                        
                                        if(data.type=="SUCCESS") {
                                            navigate(0);
                                        } else {
                                            toast.error("Unable to delete coupon.")
                                        }
                                    })
                                }}
                                ><LuTrash className="text-red-700"/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <Toaster
                position="bottom-right"
                reverseOrder={false}
        />
            {couponVisible && <CouponAdd setVisible={setCouponVisible} toast={toast} />}
        </>
    )
}