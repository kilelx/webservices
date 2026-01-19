import fs from 'fs';
import path from 'path';
import { writeJsonFile } from '../utils/writeJsonFile';
import { getPaginationLimit } from '../utils/getPaginationLimit';
import { filterByParams } from '../utils/filterByParams';
import { Product } from '../types/product.type';
import { JSON_FILE_PRODUCTS } from '../constants/JSON_FILE';
import { ProductModel } from '../models/product-schema.model';

const file: string = path.resolve('src/data/products.seed.json');
const data: string = fs.readFileSync(file, 'utf-8');
const products: Product[] = JSON.parse(data) as Product[];

export const getProductsJson = async () => {
  const file: string = path.resolve('src/data/products.seed.json');
  const data: string = fs.readFileSync(file, 'utf-8');
  const products: Product[] = JSON.parse(data) as Product[];
  return products;
};

export const seedProducts = async () => {
  const products: Product[] = await getProductsJson();
  await ProductModel.deleteMany();
  await ProductModel.insertMany(products);
};

export const getAllProducts = async (queryParams: {limit?: number; page?: number; s?: string}) => {
  const filter: Record<string, unknown[]> = {}

  const search = (queryParams.s || '').trim();

  if(search && search.length > 0) {
    const regex = new RegExp(search, 'i');
    filter.$or = [{title: regex}, {description: regex}, {category: regex}, {specs: regex}]
  }

  const page = queryParams.page ?? 1;
  const limit = queryParams.limit ?? 10;
  const skip = (page - 1) * limit;

  return ProductModel.find(filter).skip(skip).limit(limit).sort({_id: 1}).exec();
}

// export const getAllProducts = async (queryParams?: any) => {
//   let query = ProductModel.find();

//   if (queryParams?.page && queryParams?.limit) {
//     const page = Number(queryParams.page);
//     const limit = Number(queryParams.limit);
//     const skip = (page - 1) * limit;

//     query = query.skip(skip).limit(limit);
//   }

//   const data = await query.lean().exec();

//   return data as unknown as Product[];
// };

export const getProductById = async (id: string) => {
  const product = await ProductModel.findById(id);
  // const product = products.filter((product) => product.id === Number(id))[0];
  return product as Product;
};

export const createProduct = async (product: Omit<Product, 'id' | 'ean'>) => {
  const ean = Math.floor(Math.random() * 10000000).toString();
  const newProduct = await ProductModel.create({ ean, ...product });
  return { success: true, newProduct: newProduct.toJSON() as unknown as Product };
};

export const replaceProduct = async (product: Product) => {
  const { id: productId, ...rest } = product;
  const newProduct = await ProductModel.findOneAndReplace(
    {
      _id: productId,
    },
    rest,
    { new: true },
  );

  if (!newProduct) return null;

  return newProduct.toJSON() as unknown as Product;
};

export const updateProduct = async (productId: string, updates: Partial<Product>) => {
  const { id, ...rest } = updates;

  const updatedProduct = await ProductModel.findByIdAndUpdate(productId, rest, { new: true });
  if (!updatedProduct) return null;

  return updatedProduct.toJSON() as unknown as Product;
};

export const deleteProduct = async (id: string) => {
  const deletedProduct = await ProductModel.findByIdAndDelete(id);
  if (!deletedProduct) return false;
  return true;
};
