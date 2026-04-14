import { Router } from 'express';
import { register } from './handlers/index.js';

const router = Router();

// Routing for authentication and register
router.post('/auth/register', register);

export default router;
