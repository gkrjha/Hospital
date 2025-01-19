import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import Patient from "../Model/patient.model.js";
import dotenv from "dotenv";
dotenv.config();
import  localStorage  from "node-localstorage"
const signup = async (req, res, next) => {
    const { firstname, lastname, email, phone, password, gender, age } = req.body;
    if (!firstname || !lastname || !email || !phone || !password || !gender || !age) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const haspassword = await bcryptjs.hash(password, 12)
        const newPatient = new Patient({
            firstname,
            lastname,
            email,
            phone,
            password: haspassword,
            gender,
            age
        });

        await newPatient.save();
        res.status(201).json({ message: "Patient has been successfully regg.", user: newPatient });
    } catch (error) {
        next(error)
    }
};




const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const patient = await Patient.findOne({ where: { email } });
        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }
        const verifyPass = await bcryptjs.compare(password, patient.password);
        if (!verifyPass) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign(
            { patientId: patient._id, email: patient.email },
            process.env.JWT_TOKEN,
            { expiresIn: "1h" }
        );
        res.status(200).json({ message: "Login successful", patient, token });
    } catch (error) {
        next(error);
    }
};



export { signup, login };
