import { Product } from "../types/product.type";

export const getPaginationLimit = (data: Product[], queryParams: any) => {
    const page = Number(queryParams.page)
    const limit = Number(queryParams.limit)
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    if(startIndex > data.length) return []

    return data.slice(startIndex, endIndex)
}