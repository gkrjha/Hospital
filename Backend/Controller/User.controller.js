import User from "../Model/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import Patient_Details from "../Model/Patient.model.js";
import Appointment from "../Model/Appointment.model.js";
import Doctor_detail from "../Model/Doctor.model.js";
import { createDoctor } from "./Doctor.controller.js";
import { createPatient } from "./Patient.controller.js";
import { blacklistedTokens } from "../Helpers/BlacklistToken.js";
import { model } from "mongoose";
dotenv.config();

const { OAuth2 } = google.auth;
const {
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  ACCESS_TOKEN,
  EMAIL_USER,
  EMAIL_PASS,
  JWT_TOKEN,
} = process.env;

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  throw new Error("Missing OAuth2 credentials.");
}

const auth = new OAuth2(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);
auth.setCredentials({ refresh_token: REFRESH_TOKEN });

const SendPassword = async (email, name, message, subject) => {
  try {
    const accessToken = await auth.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: EMAIL_USER,
        pass: EMAIL_PASS,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: `${subject}`,
      text: `${message}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (emailError) {
    console.error("Error sending email:", emailError);
    throw new Error("Error sending email.");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const data = user.UniqueId;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userID: user.UniqueId, email: user.email, role: user.role },
      JWT_TOKEN,
      { expiresIn: "7h" }
    );

    let additionalUserData = {};
    if (user.role === "Doctor") {
      additionalUserData = await Doctor_detail.findOne({
        where: { user_ID: data },
      });
    }

    if (user.role === "Patient") {
      additionalUserData = await Patient_Details.findOne({
        where: { user_ID: data },
      });
    }

    res
      .status(200)
      .json({
        message: "Login successful",
        user,
        additionalUserData,
        data,
        token,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const CountDoctor = async (req, res) => {
  try {
    const count = await User.count({ where: { role: "Doctor" } });
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const CountPatient = async (req, res) => {
  try {
    const count = await User.count({ where: { role: "Patient" } });
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDoctor = async (req, res) => {
  try {
    const doctors = await User.findAll({ where: { role: "Doctor" } });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPatient = async (req, res) => {
  try {
    const patients = await User.findAll({
      where: { role: "Patient" },
      include: [
        {
          model: Patient_Details,
          as: "patient_detail",
          attributes: { exclude: [] },
        },
      ],
    });

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await Patient_Details.findOne({ where: { user_ID: id } });
    const doctor = await Doctor_detail.findOne({ where: { user_ID: id } });

    if (patient) {
      await Appointment.destroy({ where: { PatientId: patient.PatientID } });
      await Patient_Details.destroy({ where: { user_ID: id } });
    }

    if (doctor) {
      await Doctor_detail.destroy({ where: { user_ID: id } });
    }

    const deletedUser = await User.destroy({ where: { UniqueId: id } });

    if (deletedUser) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  const { name, email, role, phone, age, gender, specialization } = req.body;
  console.log(specialization);
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const randomPassword = "12345";
    const hashedPassword = bcrypt.hashSync(randomPassword, 12);

    const user = await User.create({
      name,
      email,
      role,
      phone,
      password: hashedPassword,
    });

    if (!user) {
      throw new Error("Error creating user");
    }
    const subject = "";
    const message = `Hello ${name} your password is ${randomPassword}`;
    await SendPassword(email, name, message, subject);

    let user_id = user.UniqueId;
    if (user.role == "Patient") {
      createPatient(user_id, age, gender);
    }
    if (user.role == "Doctor") {
      console.log(specialization);
      createDoctor(user_id, specialization);
    }
    res.status(200).json({ message: "Signup successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    blacklistedTokens.add(token);
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { signup, login, SendPassword };
