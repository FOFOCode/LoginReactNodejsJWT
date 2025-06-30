import express from "express";
import routesProdutcs from "../routes/product";
import routesUsers from "../routes/user";
import { Product } from "./productos";
import { User } from "./user";
import cors from "cors";

class Server {
  private app: express.Application;
  private port: string;

  constructor() {
    console.log("Servidor iniciado en el constructor");
    this.app = express();
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
    this.app.use("/api/products", routesProdutcs);
    this.app.use("/api/users", routesUsers);
  }

  midedlewares() {
    // Middleware to parse JSON bodies
    this.app.use(express.json());
    // Middleware to parse URL-encoded bodies
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(cors());
  }

  async dbConnection() {
    try {
      await Product.sync();
      await User.sync();
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
      throw new Error("Error al conectar a la base de datos");
    }
  }
}

export default Server;
