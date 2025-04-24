import { Link, useNavigate } from "react-router";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import { LuTrash, LuTrash2 } from "react-icons/lu";

export default function AccountPage() {
    const navigate = useNavigate();

    const [data, setData] = useState(null)

    useEffect(()=>{
        if(!localStorage.getItem("token"))
            navigate("/auth")

        fetch(`http://localhost:3030/user/get`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            cache: "force-cache"
        }).then(res=>res.json()).then(data=>{
            setData(data.msg);  
        })
    }, [])

    return (
        <>
        <Nav />
        <div className="p-4 flex">
            <AccountNav/>
            <div className="p-4">
                <h4 className="text-5xl mt-4 uppercase font-['Oswald']">Welcome, {data?.username}!</h4>

                
                <div className="border-2 border-red-400 bg-red-100 text-red-950 p-4 rounded mt-4">
                    <h3 className="flex items-center text-lg uppercase font-bold"> <LuTrash2 className="mr-1"/> Delete account</h3>
                    <span>
                    Are you sure you want to permanently delete your account? This action cannot be undone. All your data will be lost.
                    </span>
                    <button
                        className="hover:underline cursor-pointer block mt-3 bg-red-800 px-2 py-1 rounded text-white"
                        onClick={()=>{
                            fetch("http://localhost:3030/user/delete", {
                                method: "DELETE",
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                                }
                            }).then(res=>res.json()).then(data=>{
                                if(data.type=="SUCCESS") {
                                    localStorage.removeItem("token")
                                    navigate("/auth")
                                } else {
                                    alert(data)
                                }
                            })
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}