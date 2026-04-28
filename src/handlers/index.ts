import { Request, Response } from 'express';
import { User } from '../models/User.js';
import { encryptPassword, comparePassword } from '../utils/auth.js';
import slug from 'slug';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, age } = req.body;

    // Verificar si el usuario ya existe por email
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      res.status(409).json({
        message: 'El email ya está registrado',
        error: 'Conflict',
      });
      return;
    }

    // Generar el handle a partir del nombre
    let userHandle = slug(name, { lower: true });

    // Verificar si el handle ya existe
    let existingUserByHandle = await User.findOne({ handle: userHandle });
    let counter = 1;
    while (existingUserByHandle) {
      userHandle = `${slug(name, { lower: true })}-${counter}`;
      existingUserByHandle = await User.findOne({ handle: userHandle });
      counter++;
    }

    // Encriptar la contraseña
    const hashedPassword = await encryptPassword(password);

    // Crear el usuario
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      handle: userHandle,
      age: age || 0,
    });

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        handle: newUser.handle,
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

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: 'Las credenciales son incorrectas',
        error: 'Unauthorized',
      });
      return;
    }

    // Comparar las contraseñas
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        message: 'Las credenciales son incorrectas',
        error: 'Unauthorized',
      });
      return;
    }

    res.status(200).json({
      message: 'Login exitoso',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        handle: user.handle,
        age: user.age,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      message: 'Error al hacer login',
      error: (error as any).message,
    });
  }
};
