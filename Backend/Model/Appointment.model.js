import sequelize from "../config/dbConfig.js";
import { DataTypes } from "sequelize";
import Patient_Details from "./Patient.model.js";
import Doctor_detail from "./Doctor.model.js";

const Appointment = sequelize.define(
  "appointment",
  {
    AppointmentId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    PatientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Patient_Details,
        key: "PatientID",
      },
    },
    DoctorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Doctor_detail,
        key: "DoctorID",
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: new Date().toISOString().split("T")[0],
      },
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Confirm", "Pending", "Done"),
      allowNull: true,
      defaultValue: "Pending",
    },
  },
  { timestamps: true }
);

export default Appointment;
