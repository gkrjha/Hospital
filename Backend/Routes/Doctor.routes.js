import express from 'express'
import isAdmin from '../Middlewares/Authentication.js'
import { getAlldoctors,findOne, createDoctor } from '../Controller/Doctor.controller.js'
import { verifyToken } from '../Middlewares/TokenVerification.js'
const doctorRoutes = express.Router()

doctorRoutes.post("/",verifyToken,createDoctor);
doctorRoutes.get("/",verifyToken,getAlldoctors);
doctorRoutes.get('/:id',verifyToken,findOne);

export default doctorRoutes;