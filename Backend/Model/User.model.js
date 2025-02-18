import sequelize from "../config/dbConfig.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

const User = sequelize.define(
  "users",
  {
    UniqueId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value) {
        this.setDataValue("email", value.toLowerCase());
      },
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Admin", "Doctor", "Patient"),
      allowNull: false,
      defaultValue: "Doctor",
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [10, 15],
      },
    },
  },
  {
    timestamps: true,
  }
);

export default User;
