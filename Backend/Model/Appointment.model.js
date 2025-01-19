import sequelize from "../config/dbConfig";
import { DataTypes } from "sequelize";
import Patient from "./patient.model";
import Doctor from "./Doctor.model";

const Appointment = sequelize.define("Appointment", {
    patientid: {
        type: DataTypes.INTEGER,  // Should be integer, to reference Patient's 'id'
        allowNull: false,
        references: {
            model: 'Patients',
            key: 'id',
        },
    },
    doctorid: {
        type: DataTypes.INTEGER,  // Should be integer, to reference Doctor's 'id'
        allowNull: false,
        references: {
            model: 'Doctors',
            key: 'id',
        },
    },
    date: {
        type: DataTypes.DATE,  // Use DATE type for date/time fields
        allowNull: false,
    },
});

export default Appointment;
