import { Request, Response } from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  replaceProduct,
  updateProduct,
} from '../services/products.service';
import { ProductModel } from '../models/product-schema.model';

export async function getList (req: Request, res: Response) {

  const products = await ProductModel.find().exec()
  return products

  // const queryParams = req.query ?? {};

  // try {
  //   const products = getAllProducts(queryParams) ?? [];

  //   res.status(200).send(products);
  // } catch (err) {
  //   res.status(500).json({ message: 'Erreur lors de la récupération' });
  // }
};

export const get = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const product = getProductById(id);

    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.status(200).send(product);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération' });
  }
};

export const post = (req: Request, res: Response) => {
  console.dir({ payload: req.body });

  const { title, category, description, specs, price } = req.body ?? {};

  if (!title || !category || !description || !specs || !price)
    return res.status(400).json({ message: 'Invalid request.' });

  // Vérifier les types
  if (
    !(typeof title === 'string') ||
    !(typeof category === 'string') ||
    !(typeof description === 'string') ||
    !(typeof specs === 'string') ||
    !(typeof price === 'number')
  )
    return res.status(400).json({ message: 'Invalid request.' });

  try {
    const newProduct = createProduct({ title, category, description, specs, price });
    res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Erreur lors de la création du produit' });
  }
};

export const put = (req: Request, res: Response) => {
  const idParam = Number(req.params.id);

  const { id, title, category, description, specs, price, ean } = req.body ?? {};

  if (idParam !== parseInt(id)) {
    return res.status(404).send('Product not found');
  }

  if (!title || !category || !description || !specs || !price || !ean)
    return res.status(400).json({ message: 'Invalid request.' });

  // Vérifier les types
  if (
    !(typeof title === 'string') ||
    !(typeof category === 'string') ||
    !(typeof description === 'string') ||
    !(typeof specs === 'string') ||
    !(typeof price === 'number') ||
    !(typeof ean === 'string')
  )
    return res.status(400).json({ message: 'Invalid request.' });

  try {
    const newProduct = replaceProduct({ id, title, category, description, specs, price, ean });
    if (!newProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors du remplacement du produit' });
  }
};

export const patch = (req: Request, res: Response) => {
  const idParam = Number(req.params.id);
  const body = req.body ?? {};

  try {
    const updatedProduct = updateProduct(idParam, body);
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du produit' });
  }
};

export const remove = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const productToDelete = deleteProduct(id);
    if (!productToDelete) return res.status(404).json({ message: 'Product not found.' });
    res.status(204).json({ message: 'Produit supprimé.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création du produit' });
  }
};
