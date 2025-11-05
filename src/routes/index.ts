import express, { Request, Response } from 'express';
import productRoutes from './products.routes';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => res.json({ message: "V1 de l'API" }));
router.use('/products', productRoutes);

export default router;
