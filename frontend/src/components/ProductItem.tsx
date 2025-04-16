import { Link } from "react-router";


export default function ProductItem({name, price, discount, images, id}:{name:string, price:number, discount:number, images:string[], id:number}) {
    return (
        <>
        <Link to={`/product/${id}`} className="group w-1/4 p-3 border-2 border-[#F2F2F2] rounded">
            <img 
                src={images && images[0]}
                className=""
            />
            <div className="">
                <h3 className="text-lg group-hover:underline">{name}</h3>
                <span className="text-[#6F48EC] font-bold">$
                    {discount>0?(
                        <>
                        <span>{(price-price*(discount/100)).toFixed(2)}</span>
                        <small className="ml-2 text-[#5539b3] line-through">{price.toFixed(2)}</small>
                        </>
                ):(price.toFixed(2))}
                </span>
            </div>
        </Link>
        </>
    )
}