import { useState } from "react";
import Drawer from "../ui/Drawer";
import { LuX } from "react-icons/lu";

export default function Filter() {
    const [isVisible, setVisible] = useState(false)
    return (
        <Drawer>
            <div>
                <div className="flex justify-between items-center text-4xl mb-10">
                    <h4 className="font-['Oswald'] uppercase">Filter</h4>
                    <LuX className="cursor-pointer" onClick={()=>{setVisible(false)}}/>
                </div>
            </div>
        </Drawer>
    )
}