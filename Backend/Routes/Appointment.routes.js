import sequelize from "../config/dbConfig.js";
import Appointment from "../Model/Appointment.model.js";
import express from "express";
import {
//   getAppointment,
  addAppointment,
  getallAppointment,
  updateAppointmentStatus,
  appointmentBelongsToDoctor,
} from "../Controller/AppointMent.controller.js";
import { isPatient } from "../Middlewares/Authentication.js";
import { verifyToken } from "../Middlewares/TokenVerification.js";
export const appointmentrouter = express.Router();

// appointmentrouter.get("/:id", getAppointment);
appointmentrouter.get("/", getallAppointment);
appointmentrouter.post("/", addAppointment);
appointmentrouter.get("/:id",appointmentBelongsToDoctor)
appointmentrouter.put('/status/:id', updateAppointmentStatus);

