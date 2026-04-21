import { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from './handlers/index.js';

const router = Router();

// Validaciones para registro
const registerValidation = [
  body('name')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isString()
    .withMessage('El nombre debe ser texto'),
  body('email')
    .isEmail()
    .withMessage('El email debe ser válido')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('age')
    .optional()
    .isNumeric()
    .withMessage('La edad debe ser un número'),
];

// Validaciones para login
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('El email debe ser válido')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria'),
];

// Routing for authentication and register
router.post('/auth/register', registerValidation, register);
router.post('/auth/login', loginValidation, login);

export default router;
