import sequelize from "../config/dbConfig";
import { DataTypes } from "sequelize";

const Bed = sequelize.define('Bed', {
    bedID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    paitentId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nurseid: {
        type: DataTypes.STRING,
        allowNull: true
    },
})
export default Bed