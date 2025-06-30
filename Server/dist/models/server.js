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
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../routes/product"));
const user_1 = __importDefault(require("../routes/user"));
const productos_1 = require("./productos");
const user_2 = require("./user");
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        console.log("Servidor iniciado en el constructor");
        this.app = (0, express_1.default)();
        this.dbConnection();
        this.port = process.env.PORT || "3001"; // Default port if not specified in .env
        this.listen();
        console.log(process.env.PORT);
        this.midedlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
    routes() {
        this.app.use("/api/products", product_1.default);
        this.app.use("/api/users", user_1.default);
    }
    midedlewares() {
        // Middleware to parse JSON bodies
        this.app.use(express_1.default.json());
        // Middleware to parse URL-encoded bodies
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield productos_1.Product.sync();
                yield user_2.User.sync();
            }
            catch (error) {
                console.error("Error al conectar a la base de datos:", error);
                throw new Error("Error al conectar a la base de datos");
            }
        });
    }
}
exports.default = Server;
