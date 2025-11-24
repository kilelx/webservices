import { OrderItem } from "./order-item.type";

export type Order = {
    id: string;
    userId: string;
    items: OrderItem[]
}