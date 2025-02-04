import sequelize from "../config/dbConfig.js";
import { DataTypes } from "sequelize";
import Patient_Details from "./Patient.model.js";
import Doctor_detail from "./Doctor.model.js";

const Appointment = sequelize.define("appointment", {
    AppointmentId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    PatientId: {  
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'patient_details',
            key: 'PatientID'
        },
    },
    DoctorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'doctor_details',
            key: 'DoctorID'
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Confirm", "Pending", "Done"),
        allowNull: true,
        defaultValue: "Pending"
    },
    specialization:{
        type: DataTypes.STRING,
        allowNull: false,
    }
});


export default Appointment;
