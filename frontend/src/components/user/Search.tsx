import { LuSearch, LuX } from "react-icons/lu"
import Drawer from "../ui/Drawer"
import { Link, useNavigate } from "react-router"
import { useState } from "react";

export default function Search({setVisible}) {
    const navigate = useNavigate();

    const [query, setQuery] = useState(null)

    return (
        <Drawer>
            <div className="flex justify-between items-center text-4xl mb-10">
                <h4 className="font-['Oswald'] uppercase">Search</h4>
            </div>

            <div className="text-2xl flex items-center">
                <LuSearch className="mr-4"/>
                <input type="text" value={query} onChange={(e)=>{setQuery(e.target.value)}} className="flex-1 w-full border-b-2 mr-2 border-[#dad8d8] focus:border-[#555] px-2 py-1 focus:outline-0" onKeyDown={(e)=>{
                    if(e.key=="Enter") {
                        navigate(`/search?name=${query}`);
                        navigate(0)
                    }
                    
                }}/>
                <LuX className="cursor-pointer" onClick={()=>{setVisible(false)}}/>
            </div>

            <h5 className="mt-10 text-xl font-['Oswald'] tracking-wider uppercase">Popular categories</h5>
            <ul className="text-lg mt-2">
                <li><Link to={"/search?name=Men&type=category"} className="hover:underline">Men</Link></li>
                <li><Link to={"/search?name=Women&type=category"} className="hover:underline">Women</Link></li>
                <li><Link to={"/search?name=Shirt&type=category"} className="hover:underline">Shirt</Link></li>
                <li><Link to={"/search?name=Shorts&type=category"} className="hover:underline">Shorts</Link></li>
            </ul>
        </Drawer>

    )
}