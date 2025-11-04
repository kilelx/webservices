import { Product } from "../types/ProductType";

export const filterByParams = (data: Product[], search: string) => {
    
    const searchTerm = search.toLowerCase();

    const filteredProducts = data.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    return filteredProducts
}