import { LuSearch, LuX } from "react-icons/lu"
import Drawer from "../ui/Drawer"
import { useNavigate } from "react-router"
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
        </Drawer>

    )
}