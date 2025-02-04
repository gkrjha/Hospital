import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";
import User from "./User.model.js";

const Doctor_detail = sequelize.define("doctor_details", {
    DoctorID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    user_ID: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
            model: 'users',
            key: 'UniqueId',  
        },
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true
});



export default Doctor_detail;
