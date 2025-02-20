import sequelize from "../config/dbConfig.js";
import Doctor_detail from "./Doctor.model.js";
import Patient_Details from "./Patient.model.js";
import Appointment from "./Appointment.model.js";
import User from "./User.model.js"; 


User.hasOne(Patient_Details, { foreignKey: 'user_ID'});
Patient_Details.belongsTo(User, { foreignKey: 'user_ID'});

User.hasOne(Doctor_detail, { foreignKey: 'user_ID'});
Doctor_detail.belongsTo(User, { foreignKey: 'user_ID'});

Patient_Details.hasMany(Appointment, { foreignKey: 'PatientId'});
Appointment.belongsTo(Patient_Details, { foreignKey: 'PatientId',});

Doctor_detail.hasMany(Appointment, { foreignKey: 'DoctorId'});
Appointment.belongsTo(Doctor_detail, { foreignKey: 'DoctorId'});

User.hasMany(Appointment,{foreignKey:'user_ID'})
Appointment.belongsTo(User,{foreignKey:'user_ID'})

export default async function setupAssociations() {
  await sequelize.sync();  
}



