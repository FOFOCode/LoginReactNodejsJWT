import sequelize from "../db/connection";
import { DataTypes } from "sequelize";

export const User = sequelize.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'usuarios',
    timestamps: false // Disable createdAt and updatedAt fields
},)