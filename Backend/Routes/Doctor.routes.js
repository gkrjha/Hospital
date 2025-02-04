import express from 'express'
import isAdmin from '../Middlewares/Authentication.js'
import { getAlldoctors,findOne, createDoctor } from '../Controller/Doctor.controller.js'
import { verifyToken } from '../Middlewares/TokenVerification.js'
const doctorRoutes = express.Router()

doctorRoutes.post("/",createDoctor);
doctorRoutes.get("/",getAlldoctors);
doctorRoutes.get('/:id',findOne);

export default doctorRoutes;