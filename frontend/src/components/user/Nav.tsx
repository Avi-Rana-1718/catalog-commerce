import { useState } from "react";
import { LuSearch, LuShoppingCart, LuUser  } from "react-icons/lu";
import { Link } from "react-router";
import Search from "./Search";

export default function Nav() {

    const [isVisible, setVisible] = useState(false)

    return (
        <nav className="sticky top-0 bg-white flex items-center justify-between p-4 z-50">
            <Link to={"/"} className="text-xl text-[#E50010] cursor-pointer">
                <img src="/logo.png" className="w-20" />
            </Link>
            <div className="flex gap-x-7 text-xl">
                <LuSearch 
                    onClick={()=>{
                        setVisible(true);
                    }}
                    className="cursor-pointer"
                />
                <Link to={"/account"} className="hover:underline cursor-pointer">
                    <LuUser/>         
                </Link>
                <Link to={"/cart"} className="hover:underline font-['Oswald'] cursor-pointer">
                    <LuShoppingCart/>
                </Link>
            </div>
            {isVisible && <Search setVisible={setVisible}/>}
        </nav>
    )
}