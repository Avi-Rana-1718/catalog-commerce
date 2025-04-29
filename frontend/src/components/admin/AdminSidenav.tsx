import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { Link } from "react-router";
import AdminAdd from "./AdminAdd";
import toast, { Toaster } from 'react-hot-toast';

export default function AdminSidenav() {

    const [isVisible, setAddVisible] = useState(false)

    return (
        <>
            <ul className="text-lg uppercase mt-32 mr-32">
                <li onClick={()=>{setAddVisible(true)}} className="hover:bg-[#666] bg-[#000] px-4 py-2 text-white rounded flex items-center justify-center cursor-pointer mb-3">
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
                <li>
                    <Link to={"/admin/coupons"} className="hover:underline"> 
                        Coupons
                    </Link>
                </li>
            </ul>
            {isVisible && <AdminAdd setVisible={setAddVisible} toast={toast}/>}
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </>
    )
}