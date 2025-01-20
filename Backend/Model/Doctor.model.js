import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";
import Appointment from "./Appointment.model.js";
import Patient from "./patient.model.js";
import bcrypt from 'bcryptjs';

const Doctor = sequelize.define("Doctor", {
    doctorId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {

            const hashPassword = bcrypt.hashSync(value, 12);
            this.setDataValue('password', hashPassword);
        }
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// Associations
Doctor.hasMany(Appointment, { foreignKey: 'doctorId' });
Doctor.hasMany(Patient, { foreignKey: 'doctorId' });

export default Doctor;
