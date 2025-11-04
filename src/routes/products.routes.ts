import { Router } from 'express';
import { get, getList, post, put, patch, remove } from '../controllers/product.controller';

const router = Router();

router.get('/', getList);
router.get('/:id', get);
router.post('/', post);
router.put('/:id', put);
router.patch('/:id', patch);
router.delete('/:id', remove);

export default router;
