import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function Pagination({numberOfPages, currPage, onChange}) {

    if(numberOfPages==1)
        return;

    return (
        <div className="flex w-full justify-center mt-5">
            <ul className="flex text-2xl text-gray-700 gap-x-2 divide-transparent">
                <li 
                onClick={()=>{
                    if(currPage!=1)
                    onChange(currPage-1)
                }} 
                className="hover:bg-gray-50 p-2 flex justify-center items-center rounded-l-lg cursor-pointer">
                    <LuChevronLeft/>
                </li>
                {
                    [...Array(numberOfPages).keys()].map((el)=>(
                        <li
                            className={`hover:bg-gray-50 px-4 py-2 flex justify-center rounded items-center cursor-pointer ${currPage!=el+1?"text-[#888]":"bg-gray-100"}`}
                            onClick={()=>{
                                onChange(el+1)
                            }}
                        >
                            {el+1}
                        </li>
                    ))
                }
                <li 
                    onClick={()=>{
                        if(currPage!=numberOfPages)
                        onChange(currPage+1)
                    }} 
                    className="hover:bg-gray-50 p-2 flex justify-center items-center rounded-r-lg cursor-pointer">
                    <LuChevronRight/>
                </li>
            </ul>
        </div>
    )
}