import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/dbConfig.js";
import userRoute from "./Routes/Patient.routes.js";
import { ErrorHandler } from "./Middlewares/TokenVerification.js";
import userRoutes from "./Routes/User.routes.js";
import doctorRoutes from "./Routes/Doctor.routes.js";
import patientRoute from "./Routes/Patient.routes.js";
import { appointmentrouter } from "./Routes/Appointment.routes.js";
import setupAssociations from "./Model/associations.model.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/user", userRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/patient", patientRoute);
app.use("/api/appoint", appointmentrouter);

app.use(ErrorHandler);

const PORT = process.env.PORT || 3000;
setupAssociations();

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MySQL successfully.");
    return sequelize.sync({});
  })
  .then(() => {
    console.log("Database synced.");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
