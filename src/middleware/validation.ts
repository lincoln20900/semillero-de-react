import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

/**
 * Middleware de validación
 * Verifica si hay errores de validación provenientes de express-validator
 * Si hay errores, retorna una respuesta 400 con los errores
 * Si no hay errores, continúa con el siguiente middleware o handler
 */
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
