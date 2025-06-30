"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    const usuario = yield user_1.User.findOne({
        where: { correo: correo },
    });
    if (usuario) {
        return res.status(400).json({
            message: "El usuario ya existe",
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        yield user_1.User.create({
            correo: correo,
            password: hashedPassword,
        });
        res.json({
            message: "Usuario creado, " + "Correo: " + correo,
        });
    }
    catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(400).json({
            message: "Error al crear el usuario",
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    //Validar si el usuario existe en la base de datos
    const usuario = yield user_1.User.findOne({
        where: { correo: correo },
    });
    if (!usuario) {
        return res.status(400).json({
            message: "El usuario no existe con este correo: " + correo,
        });
    }
    //Validamos password
    const passwordValid = yield bcrypt_1.default.compare(password.trim(), usuario.password);
    console.log("Password valid:", passwordValid);
    if (!passwordValid) {
        return res.status(400).json({
            message: "Password incorrecto",
        });
    }
    //Generar token JWT
    const token = jsonwebtoken_1.default.sign({
        correo: correo,
    }, process.env.SECTRET_KEY || "1234");
    res.json({ token });
});
exports.loginUser = loginUser;
