import fs from 'fs';
import path from 'path';
import { Product } from '../types/ProductType';
import { writeJsonFile } from '../utils/writeJsonFile';
import { getPaginationLimit } from '../utils/getPaginationLimit';
import { filterByParams } from '../utils/filterByParams';

const file: string = path.resolve('src/data/products.seed.json');
const data: string = fs.readFileSync(file, 'utf-8');
const products: Product[] = JSON.parse(data) as Product[];

export const getAllProducts = (queryParams: any) => {
  let productsList: Product[] = products;

  if (queryParams.search) {
    productsList = filterByParams(products, queryParams.search);
    if (!productsList) return [];
  }

  if (queryParams.page && queryParams.limit) {
    productsList = getPaginationLimit(products, { page: queryParams.page, limit: queryParams.limit });
    return productsList;
  } else {
    return productsList;
  }
};

export const getProductById = (id: number) => {
  const product = products.filter((product) => product.id === Number(id))[0];
  return product as Product;
};

export const createProduct = (product: Omit<Product, 'id'>) => {
  const id = Math.floor(Math.random() * 10000000);
  const newProduct: Product = { id, ...product };
  products.push(newProduct);
  writeJsonFile(products);
  return newProduct as Product;
};

export const replaceProduct = (product: Product) => {
  const { id: productId } = product;
  const index = products.findIndex((product) => product.id === productId);
  if (index === -1) return null;

  const newProduct: Product = { ...product };
  products[index] = newProduct;
  writeJsonFile(products);
  return newProduct as Product;
};

export const updateProduct = (productId: number, updates: Partial<Product>) => {
  const index = products.findIndex((product) => product.id === productId);
  if (index === -1) return null;

  const { id, ...rest } = updates;

  const updatedProduct = { ...products[index], ...rest };
  products[index] = updatedProduct;
  writeJsonFile(products);
  return updatedProduct;
};

export const deleteProduct = (id: number) => {
  const index = products.findIndex((item) => item.id === id);

  if (index === -1) return null;

  products.splice(index, 1);
  writeJsonFile(products);
  return true;
};
