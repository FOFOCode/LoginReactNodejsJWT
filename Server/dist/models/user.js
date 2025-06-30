"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
exports.User = connection_1.default.define('usuario', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'usuarios',
    timestamps: false // Disable createdAt and updatedAt fields
});
