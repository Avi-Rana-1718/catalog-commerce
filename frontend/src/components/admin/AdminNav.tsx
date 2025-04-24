import { useEffect, useState } from "react";
import { LuUser  } from "react-icons/lu";
import { Link } from "react-router";

export default function AdminNav() {

    const [username, setUsername] = useState("Admin")

    useEffect(()=>{
        const token = localStorage.getItem("token");

        fetch("http://localhost:3030/user/get", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then(res=>res.json()).then(data=>{
            if(data?.type=="SUCCESS") {
                setUsername(data?.msg?.username)
            }
        })

    }, [])

    return (
        <nav className="sticky top-0 bg-white flex items-center justify-between p-4">
            <Link to={"/admin"} className="text-xl text-[#E50010]">
                <img src="/logo.png" className="w-20" />
            </Link>
            <div className="flex items-center">
                <LuUser className="mr-1"/> {username}
            </div>
        </nav>
    )
}