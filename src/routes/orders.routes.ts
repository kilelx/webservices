import {Router} from 'express';
import { auth } from '../middlewares/auth.middleware';
import * as orderController from "../controllers/orders.controller"

const router = Router();
router.post('/', auth, orderController.create)
router.get('/me', auth, orderController.getMyOrdersList)
router.get('/:id', auth, orderController.getById)

export default router;