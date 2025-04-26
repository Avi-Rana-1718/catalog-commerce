import { Link, useNavigate } from "react-router";
import { LuCircleCheck, LuLink2, LuSquarePen, LuTrash, LuTriangleAlert } from "react-icons/lu";

export default function ProductItem({name, productID, stock, thumbnail, openEdit}:{name:string, productID:string, thumbnail:string, stock:number, openEdit:any}) {
    let navigate = useNavigate();

    return (
        <tr className="border-t-2 border-[#F2F2F2] p-2">
            <td className="flex items-center">
                <img src={thumbnail} className="w-14 mr-2" />
                {productID}
            </td>
            <td>{name}</td>
            <td className="text-2xl">{stock!=0?<LuTriangleAlert className="text-red-500"/>:<LuCircleCheck className="text-green-500"/>}</td>
            <td>
                <Link to={`/product/${productID}`}>
                    <LuLink2 />
                </Link>
            </td>
            <td>
                <LuSquarePen onClick={()=>{
                    openEdit(productID)
                }}/>
            </td>
            <td className="text-red-700">
                <LuTrash className="cursor-pointer" onClick={()=>{
                    fetch(`http://localhost:3030/admin/deleteProduct?productID=${productID}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }).then(res=>res.json()).then(data=>{
                        console.log(data);
                        if(data.type=="SUCCESS") {
                            navigate(0);
                        }
                    })
                }}/>
            </td>
        </tr>
    )
}