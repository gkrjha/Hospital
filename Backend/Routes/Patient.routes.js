import express from "express";
import { verifyToken } from '../Middlewares/TokenVerification.js'
import isAdmin from '../Middlewares/Authentication.js'
import { findOne, getAllPatients,createPatient} from "../Controller/Patient.controller.js";
const patientRoute = express.Router();

patientRoute.post('/',createPatient)
patientRoute.get("/:id", findOne);
patientRoute.get("/",getAllPatients);

export default patientRoute;
