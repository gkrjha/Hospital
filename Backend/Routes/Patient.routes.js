import express from "express";
import { login, signup } from "../Controller/Usercontroller.js";  
const userRoute = express.Router();
userRoute.post("/", signup);
userRoute.post("/login",login)

export default userRoute;
