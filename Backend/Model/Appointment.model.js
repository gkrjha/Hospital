// In the Appointment model
import sequelize from "../config/dbConfig.js";
import { DataTypes } from "sequelize";

const Appointment = sequelize.define("Appointment", {
    patientID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Patients',
            key: 'paitentID',
        },
    },
    doctorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Doctors',
            key: 'doctorId',
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

Appointment.associate = (models) => {
    Appointment.belongsTo(models.Patient, {
        foreignKey: 'patientID',
        targetKey: 'paitentID',
    });

    Appointment.belongsTo(models.Doctor, {
        foreignKey: 'doctorId',
        targetKey: 'doctorId',
    });
};

export default Appointment;
