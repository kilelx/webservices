import { Request, Response } from 'express';
import { createProduct, getAllProducts, getProductById } from '../services/products.service';

export const getList = (_req: Request, res: Response) => {
  try {
    const products = getAllProducts();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération' });
  }
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

  try {
    const newProduct = createProduct({ title, category, description, specs, price });
    res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Erreur lors de la création du produit' });
  }
};

// export const put = (req: Request, res: Response) => {
//   const id = Number(req.params.id);
//   try {
//     const product = getProductById(id);

//     if (!product) return res.status(404).json({ message: 'Product not found.' });
//     res.status(200).send(product);
//   } catch (err) {
//     res.status(500).json({ message: 'Erreur lors de la récupération' });
//   }
// };
