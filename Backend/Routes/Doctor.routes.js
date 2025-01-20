import express from 'express'
import isAdmin from '../Middlewares/Authentication.js'
import { createDoctor,login } from "../Controller/Doctor.controller.js"
import { verifyToken } from '../Middlewares/TokenVerification.js'
const doctorRoutes = express.Router()
doctorRoutes.post('/', verifyToken,isAdmin, createDoctor)
doctorRoutes.post('/login', login)

export default doctorRoutes;