import Patient_Details from "../Model/Patient.model.js";
import User from "../Model/User.model.js";

export const findOne = async (req, res, next) => {
    try {
        const patient = await Patient_Details.findByPk(req.params.id,{
            include: {
                model: User,
                attributes: ['email','name', 'phone', 'role'],
                required: true,
                where: {
                    role: 'Patient'
                }
            }
        });
        
        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }
        res.json(patient);
    } catch (error) {
        console.log(error);
        next(error);
    }
};





export const getAllPatients = async (req, res, next) => {
    try {
        const patient = await Patient_Details.findAll({
            include: {
                model: User,
                attributes: ['email','name', 'phone', 'role'],
                required: true,
                where: {
                    role: 'Patient'
                }
            }
        });
        
        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }
        res.json(patient);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
const deletePatient = async(ewq,res,next)=>{
    try{
       const result = await Patient_Details.destroy({
        where:{PatientID:req.params.id},
            include:{
                model:User,
                required:true,
                where:{
                    role:'Patient'
                }
            }
        })
    }catch(error){
        next(error)
    }
}
export const createPatient = async (UniqueId, age, gender) => {
    if (!UniqueId || !age || !gender) {
      throw new Error("UniqueId, age, and gender are required");
    }
  
    const user = await User.findOne({ where: { UniqueId, role: "Patient" } });
    if (!user) {
      throw new Error("User not found or not a patient");
    }
  
    const patient = await Patient_Details.create({
      user_ID: UniqueId,
      age: age,
      gender: gender,
    });
  
    return patient;
  };
  
