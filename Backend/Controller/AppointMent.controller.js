import { where } from "sequelize";
import Appointment from "../Model/Appointment.model.js";
import Doctor_detail from "../Model/Doctor.model.js";
import Patient_Details from "../Model/Patient.model.js";
import User from "../Model/User.model.js";
import { Op } from "sequelize";
import sequelize from "../config/dbConfig.js";
import moment from "moment";
import { SendPassword } from "./User.controller.js";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51QtMxqFsGQXLFypacSjflqds7JoUvx4xrdRzNDQsMLhKVEFSwd0s2a8MNhyObjkUkhSDxkeDuNX6yqDaniDRVFTY00P7zUBxnV"
);

export const addAppointment = async (req, res) => {
  try {
    const { user_ID, DoctorId, date, time, AppointmentType } = req.body;

    if (!user_ID || !DoctorId || !date || !time || !AppointmentType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const timeFormatted = moment(time, "HH:mm").format("HH:mm");

    const patient = await Patient_Details.findOne({
      where: { user_ID },
      include: {
        model: User,
        attributes: ["name", "email", "Phone"],
        required: true,
      },
    });
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    const doctor = await Doctor_detail.findOne({
      where: { DoctorID: DoctorId },
      include: {
        model: User,
        attributes: ["name", "email", "phone"],
        required: true,
      },
    });
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    if (new Date(date) < new Date()) {
      return res
        .status(400)
        .json({ error: "Appointment date cannot be in the past" });
    }

    const existingAppointment = await Appointment.findOne({
      where: { user_ID, DoctorId, date },
    });
    if (existingAppointment) {
      return res
        .status(400)
        .json({ error: "You already have an appointment on this date" });
    }

    const doctorAppointmentsCount = await Appointment.count({
      where: { DoctorId, date },
    });
    if (doctorAppointmentsCount >= 5) {
      return res
        .status(400)
        .json({ error: "Doctor has reached max appointments for this date" });
    }

    const appointmentAmount =
      {
        "New Consultation": 600 * 100,
        "Follow-Up": 400 * 100,
        Emergency: 900 * 100,
      }[AppointmentType] || null;

    if (!appointmentAmount) {
      return res.status(400).json({ error: "Invalid appointment type" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: appointmentAmount,
      currency: "inr",
    });

    const newAppointment = await Appointment.create({
      user_ID,
      DoctorId,
      date,
      time: timeFormatted,
      AppointmentType,
      status: "Pending",
      paymentIntentId: paymentIntent.id,
    });
    const AppointmentMessage = `
    Hello Dr. ${doctor?.user?.dataValues?.name}
   Appointment Details
    Patient Name: ${patient?.user?.dataValues?.name}
    Email: ${patient?.user?.dataValues?.email}
    Phone: ${patient?.user?.dataValues?.Phone}
    Appointment Date:${date}}
    Appointment Time:${time}

    Booked an Appointment
`;

    await SendPassword(
      doctor?.user?.dataValues?.email,
      doctor.user.dataValues.name,
      AppointmentMessage
    );
    res.status(201).json({
      message:
        "Appointment created successfully. Please complete your payment.",
      appointment: newAppointment,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error adding appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateAppointmentStatus = async (req, res, next) => {
  console.log("Received request:", req.method, req.originalUrl);

  let { status } = req.body;
  const { id } = req.params;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  try {
    const appointment = await Appointment.findOne({
      where: { AppointmentId: id },
      include: { model: User, attributes: ["name", "email", "Phone"] },
    });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    if (status === "Confirmed" && appointment.paymentIntentId) {
      try {
        const paymentIntent = await stripe.paymentIntents.confirm(
          appointment.paymentIntentId
        );
        console.log("Payment confirmed:", paymentIntent);
        appointment.paymentStatus = "Paid";
      } catch (error) {
        console.error("Payment confirmation failed:", error);
        return res.status(500).json({ error: "Failed to confirm payment" });
      }
    }

    appointment.status = status;
    await appointment.save();

    const email = appointment.user.email;
    const name = appointment.user.name;
    const message = `Hello ${name}, your appointment has been updated. Your appointment Status is ${status}`;
    const subject = "Appointment Status Update";
    SendPassword(email, name, message, subject);

    res.status(200).json({
      message: "Appointment status successfully updated",
      appointment,
    });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    next(error);
  }
};

export const appointmentBelongsToDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const appointments = await Appointment.findAll({
      where: {
        DoctorID: id,
      },
      include: [
        {
          model: Doctor_detail,
          include: [User],
          required: true,
        },
        {
          model: User,
          required: true,
        },
      ],
    });

    if (!appointments.length) {
      return res.status(404).json({
        message: "No appointments found for this doctor",
      });
    }

    return res.status(200).json({
      message: "Appointments retrieved successfully",
      data: appointments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error, please try again later.",
      error: error.message,
    });
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
          model: User,
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

// export const getAppointment = async (req, res, next) => {
//   try {
//     const appointment = await Appointment.findOne({
//       where: { AppointmentId: req.params.id },
//       include: [
//         {
//           model: Doctor_detail,
//           include: [User],
//           required: true,
//         },
//         {
//           model: Patient_Details,
//           include: [User],
//           required: true,
//         },
//       ],
//     });
//     console.log(appointment);

//     if (!appointment) {
//       return res.status(404).json({ message: "Appointment not found" });
//     }
//     res.status(200).json(appointment);
//   } catch (error) {
//     next(error);
//   }
// };
