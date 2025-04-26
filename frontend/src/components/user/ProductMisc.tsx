import { useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

export default function ProductMisc({description}) {

    const [isDescOpen, setDescOpen] = useState(false)
    const [isDelOpen, setDelOpen] = useState(false)
    const [isCareOpen, setCareOpen] = useState(false)


    return (
        <>
            <details className="block mt-16 cursor-pointer">
            <summary onClick={()=>{
                setDescOpen(!isDescOpen)
            }} className="select-none font-semibold mb-2 w-full flex justify-between items-center text-lg">
                <h6>DESCRIPTION & FIT</h6>
                {!isDescOpen?<LuPlus/>:<LuMinus/>}
            </summary>
                {description}
            </details>

            <details className="block mt-3 cursor-pointer">
            <summary onClick={()=>{
                setCareOpen(!isCareOpen)
            }} className="select-none font-semibold mb-2 w-full flex justify-between items-center text-lg">
                <h6>CARE GUIDE</h6>
                {!isCareOpen?<LuPlus/>:<LuMinus/>}
            </summary>
                <p>
                    Bring your clean, previously loved clothing or textiles to one of our stores — they can be from any brand.
                </p>
                <strong className="block my-3">Care instructions</strong>
                <ul className="list-disc pl-6">
                    <li>Iron when damp</li>
                    <li>Line dry</li>
                    <li>Medium iron</li>
                </ul>
            </details>
            
            <details className="block mt-3 cursor-pointer">
            <summary onClick={()=>{
                setDelOpen(!isDelOpen)
            }} className="select-none font-semibold mb-2 w-full flex justify-between items-center text-lg">
                <h6>DELIVERY AND PAYMENT</h6>
                {!isDelOpen?<LuPlus/>:<LuMinus/>}
            </summary>
                <strong className="my-3">Delivery Time : 2-7 days</strong>
                <p>
                Due to additional health and safety measures to protect our logistics teams, your delivery may take a little longer. Please note, that we might not be able to deliver to all areas. You will be notified about the same during checkout. We deliver all days, except bank holidays.                </p>
            </details>
        </>
    )
}