import sequelize from "../config/dbConfig.js";
import { DataTypes } from "sequelize";
import Doctor_detail from "./Doctor.model.js";
import moment from "moment";
import User from "./User.model.js";
let time = moment("12:15PM", "hh:mmA").format("HH:mm");

const Appointment = sequelize.define(
  "appointment",
  {
    AppointmentId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    user_ID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "UniqueId",
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
    AppointmentType: {
      type: DataTypes.ENUM("New Consultation", "Follow-Up", "Emergency"),
      allowNull: false,
    },
    VisitResion: {
      type: DataTypes.STRING,
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
      type: DataTypes.ENUM("Confirm", "Pending", "Cancle"),
      allowNull: true,
      defaultValue: "Pending",
    },
    paymentIntentId: {
      type: DataTypes.STRING,
      
    },
  },
  { timestamps: true }
);

export default Appointment;
