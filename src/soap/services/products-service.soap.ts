import { IServices } from 'soap';
import { createProduct, deleteProduct, getAllProducts, getProductById } from '../../services/products.service';
import { SoapCallbackFunction } from '../types/soap-callback-function.type';

export const productsService: IServices = {
  ProductsService: {
    ProductsServicePort: {
      ListProducts: async function (_: unknown, callback: SoapCallbackFunction) {
        const products = getAllProducts();
        !!callback && callback({ products });
      },
      GetProduct: async function ({ id }: { id: number }, callback: SoapCallbackFunction) {
        const product = getProductById(id);
        !!callback && callback({ product });
      },
      CreateProduct: async function (
        {
          title,
          category,
          description,
          specs,
          price,
        }: { title: string; category: string; description: string; specs: string; price: number },
        callback: SoapCallbackFunction
      ) {
        const { newProduct } = createProduct({ title, category, description, specs, price });
        !!callback && callback({ newProduct });
      },
      DeleteProduct: async function ({ id }: { id: number }, callback: SoapCallbackFunction) {
        // TODO: afficher la response (200 dans tous les cas)
        const res = deleteProduct(Number(id));
        console.log(res)
        !!callback && callback(res);
      },
      // RESTE TODO : updateProduct et replaceProduct
    },
  },
};
