import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'almacen',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

export default sequelize;