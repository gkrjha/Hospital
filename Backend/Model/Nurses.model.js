import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";
import Doctor from "./Doctor.model.js";
import Patient from "./patient.model";

const Nurse = sequelize.define("Nurse", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    doctorId: {
        type: DataTypes.A,
        allowNull: true,
        references: {
            model: 'Doctors',
            key: 'id',
        },
    },
    patientId: {
        type: DataTypes.ARRAY,  
        allowNull: true,
        references: {
            model: 'Patients',
            key: 'id',
        },
    },
});

export default Nurse;
