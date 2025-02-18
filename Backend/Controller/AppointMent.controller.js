import { where } from "sequelize";
import Appointment from "../Model/Appointment.model.js";
import Doctor_detail from "../Model/Doctor.model.js";
import Patient_Details from "../Model/Patient.model.js";
import User from "../Model/User.model.js";
import { Op } from "sequelize";
import sequelize from "../config/dbConfig.js";
import moment from "moment";
import { SendPassword} from "./User.controller.js"


export const addAppointment = async (req, res, next) => {
    const { user_ID , DoctorId, date, time: appointmentTime } = req.body;
  
    if (!user_ID || !DoctorId || !date || !appointmentTime) {
      return res.status(400).json({ error: "Missing required fields in request body" });
    }
  
    try {
      const time = moment(appointmentTime, "hh:mmA").format("HH:mm");
  
      const patient = await Patient_Details.findOne({
        where: { user_ID},
        include: {
          model: User,
          attributes: ["name", "email", "Phone"],
          required: true,
        },
      });
  
      if (!patient || !patient.user) {
        return res.status(404).json({ error: "Patient or Patient's User data not found" });
      }

      console.log(patient);
      console.log(
        "Patient Details:",
        patient.user.dataValues.name,
        patient.user.dataValues.email,
        patient.user.dataValues.Phone
      );
  
      const doctor = await Doctor_detail.findOne({
        where: { DoctorID: DoctorId },
        include: {
          model: User,
          attributes: ["name", "email", "phone"], // Ensure 'phone' is correctly referenced here
          required: true,
        },
      });
  
      if (!doctor) {
        return res.status(404).json({ error: "Doctor not found" });
      }
  
      console.log(
        "Doctor Details:",
        doctor.user.dataValues.name,
        doctor.user.dataValues.email,
        doctor.user.dataValues.phone // Adjusted for 'phone'
      );
      
      const DoctorEmail = doctor.user.dataValues.email;
      const appointmentDate = new Date(date);
      if (isNaN(appointmentDate)) {
        return res.status(400).json({ error: "Invalid date format" });
      }
      if (appointmentDate < new Date()) {
        return res.status(400).json({ error: "Appointment date cannot be in the past" });
      }
  
      const existingAppointment = await Appointment.findOne({
        where: {
            user_ID ,
          DoctorId,
          date,
        },
      });
  
      if (existingAppointment) {
        return res.status(400).json({
          error: "You already have an appointment with this doctor on this date",
        });
      }
  
      const doctorAppointmentsCount = await Appointment.count({
        where: {
          DoctorId,
          date,
        },
      });
  
      if (doctorAppointmentsCount >= 3) {
        return res.status(400).json({
          error:
            "Doctor already has 3 appointments on this date. Please choose another date.",
        });
      }
  
      const newAppointment = await Appointment.create({
        user_ID,
        DoctorId,
        date,
        time: time,
      });
  
      
      const AppointmentMessage = `
      Hello Dr. ${doctor.user.dataValues.name}
     Appointment Details
      Patient Name: ${patient.user.dataValues.name}
      Email: ${patient.user.dataValues.email}
      Phone: ${patient.user.dataValues.Phone}
      Appointment Date:${date}}
      Appointment Time:${appointmentTime}

      Booked an Appointment
  `;
  
    
      await SendPassword(DoctorEmail, doctor.user.dataValues.name, AppointmentMessage);
  
      res.status(201).json({
        message: "Appointment created successfully",
        appointment: newAppointment,
      });
    } catch (error) {
      console.error("Error adding appointment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

export const updateAppointmentStatus = async (req, res, next) => {
  let { status } = req.body;
  const { id } = req.params;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }
  status = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  if (!["Confirm", "Pending", "Done"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }
  try {
    const appointment = await Appointment.findOne({
      where: { AppointmentId: id },
    });
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    appointment.status = status;
    await appointment.save();
    res.status(200).json({
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

export const getallAppointment = async (req, res, next) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        {
          model: Doctor_detail,
          include: [User],
          required: true,
        },
        {
          model: Patient_Details,
          include: [User],
          required: true,
        },
      ],
    });
    if (appointments.length === 0) {
      res.status(404).json("There are no Appointment");
    }
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

export const getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findOne({
      where: { AppointmentId: req.params.id },
      include: [
        {
          model: Doctor_detail,
          include: [User],
          required: true,
        },
        {
          model: Patient_Details,
          include: [User],
          required: true,
        },
      ],
    });
    console.log(appointment);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
};
