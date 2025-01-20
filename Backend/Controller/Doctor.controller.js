import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import Doctor from "../Model/Doctor.model.js";
import crypto from 'crypto';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
dotenv.config();

export const createDoctor = async (req, res, next) => {
    const { name, email, specialization } = req.body;

    try {
        const existEmail = await Doctor.findOne({ where: { email } });
        if (existEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // const password = crypto.randomBytes(6).toString('hex');
        const hashedPassword = bcrypt.hashSync('password', 12);

        const newDoctor = await Doctor.create({
            name,
            email,
            password: hashedPassword,
            specialization
        });

        // // Transporter configuration (without OAuth2 for simplicity)
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.EMAIL_PASS
        //     }
        // });

        // // Email content
        // const mailOptions = {
        //     from: process.env.EMAIL_USER,
        //     to: email,
        //     subject: 'Your Doctor Account Password',
        //     text: `Hello ${name},\n\nYour account has been created. Please follow the link below to set your password:\n\n[Your password reset link]`
        // };

        // try {
        //     const info = await transporter.sendMail(mailOptions);
        //     console.log("INFORMATION", info);
        // } catch (emailError) {
        //     console.error("Error sending email:", emailError);
        //     return res.status(500).json({ message: "Error sending email. Please try again." });
        // }

        // // Send the response without the password
        // const { password: _, ...doctorResponse } = newDoctor.toJSON();
        newDoctor.save()
        res.status(201).json(newDoctor);

    } catch (error) {
        console.error("Error in creating doctor:", error);
        next(error);
    }
};




export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }


    const doctor = await Doctor.findOne({ where: { email } });
    if (!doctor) {
        return res.status(404).json({ message: "Email not found" });
    }


    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }

  
    const token = jwt.sign(
        { doctorId: doctor.id, email: doctor.email, role: doctor.role },
        process.env.JWT_TOKEN,
        { expiresIn: '1h' }
    );

  
    return res.json({ token });
};