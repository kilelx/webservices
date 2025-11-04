import fs from 'fs';
import path from 'path';
import { Product } from '../types/ProductType';

const file: string = path.resolve('src/data/products.seed.json');
const data: string = fs.readFileSync(file, 'utf-8');
const products: Product[] = JSON.parse(data) as Product[];

export const getAllProducts = () => {
  return products;
};

export const getProductById = (id: number) => {
  const product = products.filter((product) => product.id === Number(id))[0];
  return product as Product;
};

export const createProduct = (product: Omit<Product, 'id'>) => {
  const id = Math.floor(Math.random() * 10000000);
  const newProduct: Product = { id, ...product };
  return newProduct as Product;
};
