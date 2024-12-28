import express from 'express'
import { getProducts } from '../controllers/getProducts.controller';
import { addProducts } from '../controllers/addProducts.controller';
import { generatePdf } from '../controllers/generatePdf.controller';

const router = express.Router();

router.get('/:userId/get', getProducts);
router.post('/:userId/add', addProducts);
router.post('/generate-pdf', generatePdf);

export default router;