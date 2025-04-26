import ItemPreview from "../user/ItemPreview"

export default function OrderItem({orderID, orderBy, orderAt, items, address, status}) {
    return (
        <li className="mt-4">
            <div className="p-3 flex justify-between bg-[#b6b6b6]">
                <span>{status} | {orderID}</span>
                <span>Ordered at <time>{orderAt}</time></span>
            </div>
            <div className="p-3 border-x-2 border-[#F3F3F3]">
                <h4 className="mt-3 text-lg font-medium uppercase">Items [{items.length}]</h4>
                <ul className="mt-1 border-t-2 border-[#F3F3F3] pt-3">
                    {items.map((el)=>{
                        return <ItemPreview id={el?.id} options={el?.options} price={el?.price} quantity={el?.quantity} key={el?.id}/>
                    })}
                </ul>
            </div>
            <div className="p-3 bg-[#b6b6b6]">
                Ordered placed by: {orderBy} ({address.name})
            </div>
        </li>
    )
}