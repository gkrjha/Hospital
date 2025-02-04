import sequelize from "../config/dbConfig.js";
import { DataTypes } from "sequelize";
import Appointment from "./Appointment.model.js";

const User = sequelize.define('users', {
    UniqueId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('email', value.toLowerCase());
        },
        validate: {
            isEmail: true 
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('Admin','Doctor', 'Nurse',"Patient"), 
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [10, 15] 
        }
    }
}, {
    tableName: 'users',
    timestamps: false 
});



export default User;
