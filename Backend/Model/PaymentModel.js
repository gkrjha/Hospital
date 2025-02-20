import { DataType, DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";
import Appointment from "./Appointment.model.js";

const Payment = sequelize.define(
  "payment",
  {
    PaymentId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    appointment_ID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Appointment,
        key: "AppointmentId",
      },
      onDelete: "CASCADE",
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: 0,
      },
    },
    paymentMethod: {
      type: DataTypes.ENUM("Credit Card", "Debit Card", "PayPal", "Cash"),
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.ENUM("Pending", "Completed", "Failed"),
      allowNull: false,
      defaultValue: "Pending",
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);
Appointment.hasOne(Payment, { foreignKey: "AppointmentId" });
Payment.belongsTo(Appointment, { foreignKey: "AppointmentId" });

export default Payment;
