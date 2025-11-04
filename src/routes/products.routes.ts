import { Router } from 'express';
import { get, getList, post } from '../controllers/product.controller';

const router = Router();

router.get('/', getList);
router.get('/:id', get);
router.post('/', post);
// router.put('/', put);

export default router;
