import { Router } from 'express';
import { createSale, getSales, getSaleById, updateSale, deleteSale } from '../controllers/saleController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticate, createSale);
router.get('/', authenticate, getSales);
router.get('/:id', authenticate, getSaleById);
router.put('/:id', authenticate, updateSale);
router.delete('/:id', authenticate, deleteSale);

export default router;