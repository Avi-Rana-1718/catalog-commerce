import { LuPlus } from "react-icons/lu";
import { Link } from "react-router";

export default function AdminSidenav({setAddVisible}) {
    return (
        <ul className="text-lg uppercase mt-32 mr-32">
            <li onClick={()=>{setAddVisible(true)}} className="hover:bg-[#666] bg-[#555] px-4 py-2 text-white rounded flex items-center justify-center cursor-pointer mb-3">
                <LuPlus className="inline mr-1" /> Add
            </li>
            <li>
                <Link to={"/admin"} className="hover:underline">
                    Dashboard
                </Link>
            </li>
            <li>
                <Link to={"/admin/orders"} className="hover:underline"> 
                    Orders
                </Link>
            </li>
        </ul>
    )
}