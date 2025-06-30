import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

export const newUser = async (req: Request, res: Response) => {
  const { correo, password } = req.body;

  const usuario = await User.findOne({
    where: { correo: correo },
  });

  if (usuario) {
    return res.status(400).json({
      message: "El usuario ya existe",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      correo: correo,
      password: hashedPassword,
    });

    res.json({
      message: "Usuario creado, " + "Correo: " + correo,
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(400).json({
      message: "Error al crear el usuario",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { correo, password } = req.body;

  //Validar si el usuario existe en la base de datos
  const usuario: any = await User.findOne({
    where: { correo: correo },
  });

  if (!usuario) {
    return res.status(400).json({
      message: "El usuario no existe con este correo: " + correo,
    });
  }

  //Validamos password
  const passwordValid = await bcrypt.compare(password.trim(), usuario.password);
  console.log("Password valid:", passwordValid);
  if (!passwordValid) {
    return res.status(400).json({
      message: "Password incorrecto",
    });
  }

  //Generar token JWT
  const token = jwt.sign(
    {
      correo: correo,
    },
    process.env.SECTRET_KEY || "1234"
  );

  res.json({ token });
};
