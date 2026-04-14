import { Request, Response } from 'express';
import { User } from '../models/User.js';
import { encryptPassword } from '../utils/auth.js';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, age } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        message: 'El email ya está registrado',
        error: 'Conflict',
      });
      return;
    }

    // Encriptar la contraseña
    const hashedPassword = await encryptPassword(password);

    // Crear el usuario
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      age: age || 0,
    });

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        age: newUser.age,
      },
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      message: 'Error al registrar usuario',
      error: (error as any).message,
    });
  }
};
