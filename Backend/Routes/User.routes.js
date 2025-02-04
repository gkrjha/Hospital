import {CountDoctor, CountPatient, login,signup,deleteUser} from "../Controller/User.controller.js"
import express from 'express';
import isAdmin from '../Middlewares/Authentication.js'
import { verifyToken } from '../Middlewares/TokenVerification.js';
import { getDoctor,getPatient } from "../Controller/User.controller.js";
const userRoutes = express.Router();

userRoutes.post('/',verifyToken,isAdmin,signup);
userRoutes.post('/login', login);
userRoutes.get("/count",CountDoctor)
userRoutes.get("/doctor",getDoctor)
userRoutes.get("/patient",getPatient)
userRoutes.get("/count/patient",CountPatient)
userRoutes.delete("/:id",deleteUser)

export default userRoutes;
