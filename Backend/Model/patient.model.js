import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";
import bcrypt from "bcryptjs"
const Patient = sequelize.define("Patient", {
    paitentID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fullname: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.firstname} ${this.lastname}`
        },
        set(value) {
            throw new Error("Don't need to enter full name");
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue('email', value.toLowerCase())
        },
        validate: {
            isEmail: true,
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
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM("M", "F", "O"),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    appoinment: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},{timestamps:true});

export default Patient;
