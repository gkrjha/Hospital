import { DataType, DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";
import User from "./User.model";
import Doctor_detail from "./Doctor.model";


export const Payment = sequelize.define("payments",{
    PaymentId:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    UserId:{
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
    Payment:{
        type:DataTypes.STRING,
        allowNull:false
    }
})