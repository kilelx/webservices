import fs from 'fs';
import path from 'path';
import { writeJsonFile } from '../utils/writeJsonFile';
import { getPaginationLimit } from '../utils/getPaginationLimit';
import { filterByParams } from '../utils/filterByParams';
import { Product } from '../types/product.type';
import { JSON_FILE_PRODUCTS } from '../constants/JSON_FILE';

const file: string = path.resolve('src/data/products.seed.json');
const data: string = fs.readFileSync(file, 'utf-8');
const products: Product[] = JSON.parse(data) as Product[];

export const getAllProducts = (queryParams?: any) => {
  let productsList: Product[] = products;

  if (queryParams && queryParams.search) {
    productsList = filterByParams(products, queryParams.search);
    if (!productsList) return [];
  }
  
  if (queryParams && queryParams.page && queryParams.limit) {
    productsList = getPaginationLimit(productsList, { page: queryParams.page, limit: queryParams.limit });
    return productsList;
  } else {
    return productsList;
  }
};

export const getProductById = (id: number) => {
  const product = products.filter((product) => product.id === Number(id))[0];
  return product as Product;
};

export const createProduct = (product: Omit<Product, 'id' | 'ean'>) => {
  const id = Math.floor(Math.random() * 10000000);
  const ean = (Math.floor(Math.random() * 10000000)).toString();
  const newProduct: Product = { id, ean, ...product };
  products.push(newProduct);
  writeJsonFile(JSON_FILE_PRODUCTS, products);
  return {success: true, newProduct: newProduct as Product};
};

export const replaceProduct = (product: Product) => {
  const { id: productId } = product;
  const index = products.findIndex((product) => product.id === productId);
  if (index === -1) return null;

  const newProduct: Product = { ...product };
  products[index] = newProduct;
  writeJsonFile(JSON_FILE_PRODUCTS, products);
  return newProduct as Product;
};

export const updateProduct = (productId: number, updates: Partial<Product>) => {
  const index = products.findIndex((product) => product.id === productId);
  if (index === -1) return null;

  const { id, ...rest } = updates;

  const updatedProduct = { ...products[index], ...rest };
  products[index] = updatedProduct;
  writeJsonFile(JSON_FILE_PRODUCTS, products);
  return updatedProduct;
};

export const deleteProduct = (id: number) => {
  const index = products.findIndex((item) => item.id === id);

  if (index === -1) return null;

  products.splice(index, 1);
  writeJsonFile(JSON_FILE_PRODUCTS, products);
  return true;
};
