import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";
import Appointment from "./Appointment.model";
import Patient from "./patient.model";

const Doctor = sequelize.define("Doctor", {
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
    },
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Patients',
            key: 'id',
        },
    }
});

Doctor.hasMany(Appointment, { foreignKey: 'doctorid' });

export default Doctor;
