import express, { Request, Response } from 'express';
import authRouter from './auth.routes';
import productRouter from './products.routes';
import ordersRouter from './orders.routes';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => res.json({ message: "V1 de l'API" }));
router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/orders', ordersRouter);

export default router;
