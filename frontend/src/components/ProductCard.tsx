import { Link } from "react-router";

interface ProductCartProps {
    name:string,
    price:number,
    discount:number,
    images:string[],
    id:number,
    stock:number
}


export default function ProductCard({name, price, discount, images, id, stock}:ProductCartProps) {
    return (
        <>
        <Link to={`/product/${id}`} className="group w-1/6">
            <div className="relative">
                <img 
                    src={images && images[0]}
                    className="group-hover:hidden"
                />
                <img 
                    src={images && images[1]}
                    className="hidden group-hover:block"
                />
                {stock==0 && <span className="bg-[#555] px-2 py-1 text-white absolute top-0 right-0">SOLD OUT</span>}
            </div>

            <div className="mt-4">
                <h3 className="text-lg group-hover:underline">{name}</h3>
                <span className="font-bold">Rs. 
                    {discount>0?(
                        <>
                        <span>{(price-price*(discount/100)).toFixed(2)}</span>
                        <small className="ml-2 line-through">{price.toFixed(2)}</small>
                        </>
                ):(price.toFixed(2))}
                </span>
            </div>
        </Link>
        </>
    )
}