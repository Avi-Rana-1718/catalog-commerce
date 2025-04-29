import { useState } from "react";
import Drawer from "../ui/Drawer";
import { LuMinus, LuX } from "react-icons/lu";
import Input from "../ui/Input";
import PrimaryBtn from "../ui/PrimaryBtn";

export default function Filter({setVisible, min, max, setMin, setMax}) {
    return (
        <Drawer>
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div>
                        <div className="flex justify-between items-center text-4xl mb-10">
                            <h4 className="font-['Oswald'] uppercase">Filter</h4>
                            <LuX className="cursor-pointer" onClick={()=>{setVisible(false)}}/>
                        </div>
                    </div>

                    <label className="uppercase">Price range</label>
                    <div className="flex items-center">
                    <Input type="number" placeholder="Min" value={min} onChange={(e)=>{setMin(e.target.value)}}/>
                    <span><LuMinus className="mx-4"/></span>
                    <Input type="number" placeholder="Max" value={max} onChange={(e)=>{setMax(e.target.value)}}/>
                    </div>
                </div>
                <PrimaryBtn label={"Apply"} onClick={()=>{setVisible(false)}}/>
            </div>
        </Drawer>
    )
}