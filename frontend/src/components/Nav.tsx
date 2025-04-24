import { useState } from "react";
import { LuHeart, LuSearch, LuShoppingCart, LuUser  } from "react-icons/lu";
import { Link } from "react-router";
import Search from "./Search";

export default function Nav() {

    const [isVisible, setVisible] = useState(false)

    return (
        <nav className="sticky top-0 bg-white flex items-center justify-between p-4 z-50">
            <Link to={"/"} className="text-xl text-[#E50010]">
                <img src="/logo.png" className="w-20" />
            </Link>
            <div className="flex gap-x-7 text-xl">
                <LuSearch onClick={()=>{
                    setVisible(true);
                }}/>
                <Link to={"/account"} className="hover:underline">
                <LuUser/>         
                </Link>
                <LuHeart/>
                <Link to={"/cart"} className="hover:underline">
                    <LuShoppingCart/>
                </Link>
            </div>
            {isVisible && <Search setVisible={setVisible}/>}
        </nav>
    )
}