import { Link, useNavigate } from "react-router";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";

export default function Account() {
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
        <div className="p-4">
            <h3 className="text-2xl">Account</h3>
            <h4 className="text-xl mt-4">Welcome, {data?.username}!</h4>
            <ul className="flex gap-x-4">
                <li>
                    <Link to={"/cart"}>
                    Cart
                    </Link>
                </li>
                <li>
                    <Link to={"/orders"}>
                    Orders
                    </Link>
                </li>
                <li>
                    Account settings
                </li>
            </ul>

        </div>
        </>
    )
}