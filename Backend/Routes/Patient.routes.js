import express from "express";
import { verifyToken } from '../Middlewares/TokenVerification.js'
import isAdmin from '../Middlewares/Authentication.js'
import { findOne, getAllPatients,createPatient} from "../Controller/Patient.controller.js";
const patientRoute = express.Router();

patientRoute.post('/',verifyToken,createPatient)
patientRoute.get("/:id",verifyToken, findOne);
patientRoute.get("/",verifyToken,getAllPatients);

export default patientRoute;
