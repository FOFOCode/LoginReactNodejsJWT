import { DataTypes } from "sequelize";
import  sequelize  from "../db/connection";

export const Product = sequelize.define('producto', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name:{
        type: DataTypes.STRING,
        allowNull: false
    },

    description:{
        type: DataTypes.STRING,
        allowNull: true
    },

    price:{
        type: DataTypes.FLOAT,
        allowNull: false
    },

    stock:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'productos',
    timestamps: false // Disable createdAt and updatedAt fields
});
