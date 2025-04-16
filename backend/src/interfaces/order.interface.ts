import { Product } from "./product.interface";

export interface Order {
    orderID: Number,
    items: [Product],
    orderedBy: String,
    orderedAt: Number
}