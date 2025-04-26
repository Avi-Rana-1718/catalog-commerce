import { LuLoaderCircle } from "react-icons/lu";

export default function PrimaryBtn({label, disabled=false, onClick, isLoading=false}) {
    return (
        <button
            disabled={disabled||isLoading}
            className="hover:bg-[#666] w-full bg-[#000] uppercase mt-10 px-4 py-2 text-white flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:bg-[#666]"
            onClick={onClick}
        >
            {isLoading && <LuLoaderCircle className="animate-spin mr-1"/>}{label}
        </button>
    )
}