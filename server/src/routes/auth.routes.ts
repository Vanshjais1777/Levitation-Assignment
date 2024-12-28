import express from 'express'
import { signIn } from '../controllers/auth/signIn.controller';
import { signUp } from '../controllers/auth/signUp.controller';

const router = express.Router();

router.post('/sign-in', signIn);
router.post('/sign-up', signUp);

export default router;