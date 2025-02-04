import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";
import User from "./User.model.js";

const Patient_Details = sequelize.define("patient_details", {
    PatientID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    user_ID: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'UniqueId'
        }
    },
    gender: {
        type: DataTypes.ENUM("M", "F", "O"),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: true
});



export default Patient_Details;
