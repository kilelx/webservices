import { Request, Response } from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  replaceProduct,
  seedProducts,
  updateProduct,
} from '../services/products.service';
import { ProductModel } from '../models/product-schema.model';

export async function getList (_req: Request, res: Response) {
  const products = await ProductModel.find().exec()
  res.status(200).json(products)
};

export const get = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const product = await getProductById(id);

    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.status(200).send(product);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération' });
  }
};

export const seed = async (_req: Request, res: Response) => {
  await seedProducts()
  res.status(201).json({message: 'OK'})
}

export const post = async (req: Request, res: Response) => {
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
    const newProduct = await createProduct({ title, category, description, specs, price });
    res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Erreur lors de la création du produit' });
  }
};

export const put = async (req: Request, res: Response) => {
  const idParam = req.params.id;

  const { id, title, category, description, specs, price, ean } = req.body ?? {};

  if (idParam !== id) {
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
    const newProduct = await replaceProduct({ id, title, category, description, specs, price, ean });
    if (!newProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors du remplacement du produit' });
  }
};

export const patch = async (req: Request, res: Response) => {
  const idParam = req.params.id;
  const body = req.body ?? {};

  try {
    const updatedProduct = await updateProduct(idParam, body);
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du produit' });
  }
};

export const remove = async (req: Request, res: Response) => {
  const id = req.params.id;  // Garder en string pour MongoDB

  try {
    const productToDelete = await deleteProduct(id);
    if (!productToDelete) return res.status(404).json({ message: 'Product not found.' });
    res.status(204).json({ message: 'Produit supprimé.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression du produit' });
  }
};
