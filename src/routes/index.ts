import express, { Request, Response } from 'express';
import authRoutes from './auth.routes';
import productRoutes from './products.routes';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => res.json({ message: "V1 de l'API" }));
router.use('/auth', authRoutes);
router.use('/products', productRoutes);

export default router;
