import { IServices } from 'soap';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  replaceProduct,
  updateProduct,
} from '../../services/products.service';
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

        if (product) return !!callback && callback({ product });

        return (
          !!callback &&
          callback({
            Fault: {
              faultcode: 'soap:Client',
              faultstring: `Product with ID ${id} not found`,
              detail: {
                code: 404,
                message: `Product with ID ${id} does not exist`,
              },
            },
          })
        );
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
        const res = deleteProduct(Number(id));

        if (res) return !!callback && callback(res);

        return (
          !!callback &&
          callback({
            Fault: {
              faultcode: 'soap:Client',
              faultstring: `Product with ID ${id} not found`,
              detail: {
                code: 404,
                message: `Product with ID ${id} does not exist`,
              },
            },
          })
        );
      },
      UpdateProduct: async function (
        {
          id,
          title,
          category,
          description,
          specs,
          price,
        }: { id: number; title: string; category: string; description: string; specs: string; price: number },
        callback: SoapCallbackFunction
      ) {
        const updatedProduct = updateProduct(Number(id), { title, category, description, specs, price });

        if (updatedProduct) return !!callback && callback({ product: updatedProduct });

        return (
          !!callback &&
          callback({
            Fault: {
              faultcode: 'soap:Client',
              faultstring: `Product with ID ${id} not found`,
              detail: {
                code: 404,
                message: `Product with ID ${id} does not exist`,
              },
            },
          })
        );
      },
      ReplaceProduct: async function (
        {
          id,
          title,
          category,
          description,
          specs,
          price,
          ean,
        }: {
          id: number;
          title: string;
          category: string;
          description: string;
          specs: string;
          price: number;
          ean: string;
        },
        callback: SoapCallbackFunction
      ) {
        console.log(id);
        const newProduct = replaceProduct({ id: Number(id), title, category, description, specs, price, ean });

        if (newProduct) return !!callback && callback({ product: newProduct });

        return (
          !!callback &&
          callback({
            Fault: {
              faultcode: 'soap:Client',
              faultstring: `Product with ID ${id} not found`,
              detail: {
                code: 404,
                message: `Product with ID ${id} does not exist`,
              },
            },
          })
        );
      },
    },
  },
};
