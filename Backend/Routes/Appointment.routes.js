import sequelize from "../config/dbConfig.js";
import Appointment from "../Model/Appointment.model.js";
import express from "express";
import { getAppointment,addAppointment,getallAppointment ,updateAppointmentStatus} from "../Controller/AppointMent.controller.js";
import { isPatient } from "../Middlewares/Authentication.js";
import { verifyToken } from "../Middlewares/TokenVerification.js";
export const appointmentrouter = express.Router();


appointmentrouter.get('/:id',verifyToken,getAppointment)
appointmentrouter.get('/',verifyToken,getallAppointment)
appointmentrouter.post('/',verifyToken,addAppointment);
appointmentrouter.put("/update-status/:id",verifyToken, updateAppointmentStatus);
