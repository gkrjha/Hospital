import {CountDoctor, CountPatient, login,signup,deleteUser, logout} from "../Controller/User.controller.js"
import express from 'express';
import isAdmin from '../Middlewares/Authentication.js'
import { verifyToken } from '../Middlewares/TokenVerification.js';
import { getDoctor,getPatient } from "../Controller/User.controller.js";
const userRoutes = express.Router();

userRoutes.post('/',verifyToken,isAdmin,signup);
userRoutes.post('/login', login);
userRoutes.post("/logout",logout)
userRoutes.get("/count",verifyToken,CountDoctor)
userRoutes.get("/doctor",verifyToken,isAdmin,getDoctor)
userRoutes.get("/patient",getPatient)
userRoutes.get("/count/patient",verifyToken,CountPatient)
userRoutes.delete("/:id",verifyToken,deleteUser)

export default userRoutes;
