import { useEffect, useState } from "react";
import Nav from "../components/user/Nav";
import OrderItem from "../components/user/OrderItem";
import AccountNav from "../components/user/AccountNav";
import Pagination from "../components/ui/Pagination";
import { LuLoaderCircle, LuPackage } from "react-icons/lu";
import Footer from "../components/user/Footer";

export default function OrdersPage() {

    const [data, setData] = useState([])
    const [pages, setPages] = useState(1)

    const [isLoading, setLoading] = useState(false)

    const [currPage, setCurrPage] = useState(1);

    useEffect(()=>{
        setLoading(true)
        fetch(`http://localhost:3030/order/all/?page=${currPage}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            setLoading(false)
            setData(data.msg.rows)    
            setPages(data.msg.totalPages)     
        })
    }, [currPage])
    

    return (
        <>
        <Nav/>
        <div className="p-4 md:flex">
            <div className="hidden md:block">
                <AccountNav />
            </div>
            <div className="md:p-4 w-full">
                <h4 className="text-5xl mt-4 uppercase font-['Oswald'] mb-5">ORDERS</h4>
                <ul>
                    {isLoading && 
                        <div className="text-[#626161] flex flex-col items-center justify-center h-[60lvh]">
                            <LuPackage className="text-9xl animate-bounce"/>
                            <h4 className="text-xl color-black flex items-center  mt-4">
                                <LuLoaderCircle className="animate-spin mr-1"/>Getting your order history!</h4>

                        </div>
}
                    {data && data.map((el)=>{
                        return <OrderItem key={el?.orderid} orderID={el?.orderid} orderedAt={el?.orderedat} items={el?.items} address={el?.address} status={el?.status}/>
                    })}
                </ul>
                <Pagination
                    numberOfPages={pages}
                    currPage={currPage}
                    onChange={(page)=>{
                        setCurrPage(page);
                        setData(null)
                    }}
                />
            </div>
        </div>
        <Footer/>
        </>
    )
}