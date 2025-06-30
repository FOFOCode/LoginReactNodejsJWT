import Server  from "./models/server";
import dotenv from 'dotenv';

//Configure dotenv to load environment variables from .env file
dotenv.config();

const server = new Server();
