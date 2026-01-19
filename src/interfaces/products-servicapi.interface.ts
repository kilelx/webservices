import { Product } from "../types/product.type";

export interface ProductsServiceAPI {
    
    getAllProducts: (queryParams: {limit?: number; page?: number; s?: string}) => Promise<Product[]>,
    
    getProductById: (id: string) => Promise<Product | null | undefined>,
    
    createProduct: (product: Omit<Product, 'id' | 'ean'>) => Promise<{success: boolean, newProduct: Product} | null | undefined>,
    replaceProduct: (product: Product) => Promise<Product | null>,
    updateProduct: (productId: string, updates: Partial<Product>) => Promise<Product | null>,
    deleteProduct: (id: string) => Promise<boolean>
}