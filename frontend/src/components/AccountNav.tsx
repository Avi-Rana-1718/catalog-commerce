import { Link, useNavigate } from "react-router";

export default function AccountNav() {
    const navigate = useNavigate()
    return (
        <ul className="text-lg uppercase mt-32 mr-32">
                <li>
                    <Link to={"/account"} className={`hover:underline`}>
                    Account
                    </Link>
                </li>
                <li>
                    <Link to={"/cart"} className={`hover:underline`}>
                    Cart
                    </Link>
                </li>
                <li>
                    <Link to={"/orders"} className={`hover:underline`}>
                    Orders
                    </Link>
                </li>
                <li className="text-[#666] underline mt-10" onClick={()=>{
                    localStorage.removeItem("token");
                    navigate("/auth")
                }}>
                    Sign out
                </li>
        </ul>
    )
}