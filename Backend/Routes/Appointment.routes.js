import sequelize from "../config/dbConfig.js";
import Appointment from "../Model/Appointment.model.js";
import express from "express";
import { getAppointment,addAppointment,getallAppointment } from "../Controller/AppointMent.controller.js";
import { isPatient } from "../Middlewares/Authentication.js";
export const appointmentrouter = express.Router();


appointmentrouter.get('/:id',getAppointment)
appointmentrouter.get('/',getallAppointment)
appointmentrouter.post('/',addAppointment);

