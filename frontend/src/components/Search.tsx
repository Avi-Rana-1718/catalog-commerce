import { LuX } from "react-icons/lu"
import Drawer from "./ui/Drawer"

export default function Search({setVisible}) {
    return (
        <Drawer>
            <div className="flex justify-between items-center text-3xl">
                <h4 className="font-['Oswald'] uppercase">Search</h4>
                <LuX className="cursor-pointer" onClick={()=>{setVisible(false)}}/>
            </div>
        </Drawer>

    )
}