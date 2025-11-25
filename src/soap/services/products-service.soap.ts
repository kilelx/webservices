import { IServices } from 'soap';
import { getAllProducts } from '../../services/products.service';
import { SoapCallbackFunction } from '../types/soap-callback-function.type';

export const productsService: IServices = {
  ProductsService: {
    ProductsServicePort: {
      ListProducts: async function (_: unknown, callback: SoapCallbackFunction) {
        console.log("ici product service soap")
        const products = getAllProducts();
        !!callback && callback({ products });
      },
    },
  },
};
