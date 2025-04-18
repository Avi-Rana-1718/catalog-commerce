import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router";

export default function Nav() {

    const [username, setUsername] = useState("sign in")

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
        <nav className=" flex items-center justify-between p-3 border-b-2 border-[#F2F2F2]">
            <Link to={"/"} className="text-xl">Catalog</Link>
            <div className="flex flex-1 justify-between max-w-[50vw] items-center bg-[#F2F2F2] rounded">
                <input placeholder="Search" className="outline-[#6F48EC] w-full px-3 py-2"/>
                <FaSearch className="mr-3"/>
            </div>
            <div className="flex gap-x-3">
                <Link to={"/account"} className="hover:underline">
                    Hello, {username}!
                </Link>
                <Link to={"/cart"} className="flex items-center hover:underline">
                    <FaCartShopping className="text-lg mx-3"/>Cart
                </Link>
            </div>
        </nav>
    )
}