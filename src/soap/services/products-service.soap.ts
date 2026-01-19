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
import { verify } from '../../utils/jwt.utils';

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
        callback: SoapCallbackFunction,
        headers: any
      ) {
        if (!callback) return;

        const token = headers?.AuthHeader?.token;

        try {
          if (!token || !verify(token)) throw new Error('Unauthorized');
        } catch {
          return callback({
            Fault: {
              faultcode: 'soap:Client',
              faultstring: 'Unauthorized',
              detail: { code: 401, message: 'Unauthorized' },
            },
          });
        }

        const { newProduct } = createProduct({ title, category, description, specs, price });
        !!callback && callback({ newProduct });
      },
      DeleteProduct: async function ({ id }: { id: number }, callback: SoapCallbackFunction, headers: any) {
        if (!callback) return;

        const token = headers?.AuthHeader?.token;

        try {
          if (!token || !verify(token)) throw new Error('Unauthorized');
        } catch {
          const res = deleteProduct(Number(id));

          if (res) return callback(res);

          return callback({
            Fault: {
              faultcode: 'soap:Client',
              faultstring: `Product with ID ${id} not found`,
              detail: {
                code: 404,
                message: `Product with ID ${id} does not exist`,
              },
            },
          });
        }
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
        callback: SoapCallbackFunction,
        headers: any
      ) {
        if (!callback) return;

        const token = headers?.AuthHeader?.token;

        try {
          if (!token || !verify(token)) throw new Error('Unauthorized');
        } catch {
          const updatedProduct = updateProduct(Number(id), { title, category, description, specs, price });

          if (updatedProduct) return callback({ product: updatedProduct });

          return callback({
            Fault: {
              faultcode: 'soap:Client',
              faultstring: `Product with ID ${id} not found`,
              detail: {
                code: 404,
                message: `Product with ID ${id} does not exist`,
              },
            },
          });
        }
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
        callback: SoapCallbackFunction,
        headers: any
      ) {
        if (!callback) return;

        const token = headers?.AuthHeader?.token;

        try {
          if (!token || !verify(token)) throw new Error('Unauthorized');
        } catch {
          const newProduct = replaceProduct({ id: Number(id), title, category, description, specs, price, ean });

          if (newProduct) return callback({ product: newProduct });

          return callback({
            Fault: {
              faultcode: 'soap:Client',
              faultstring: `Product with ID ${id} not found`,
              detail: {
                code: 404,
                message: `Product with ID ${id} does not exist`,
              },
            },
          });
        }
      },
    },
  },
};
