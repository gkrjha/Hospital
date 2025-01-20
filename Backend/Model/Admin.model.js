import sequelize from "../config/dbConfig.js";
import { DataTypes } from "sequelize";
import bcrypt from 'bcryptjs'
const Admin = sequelize.define('Admin', {
    adminId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('email', value.toLowerCase())
        },
        validate: {
            isEmail: true
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const hashpassword = bcrypt.hashSync(value, 12);
            this.setDataValue('password', hashpassword)
        }
    },
    role: {
        type: DataTypes.ENUM('Admin'),
        allowNull: false,
        defaultValue: 'Admin'
    }
}, {
    tableName: 'admin',
    timestamps: false
});

export default Admin;
