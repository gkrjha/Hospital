import Doctor_detail from "../Model/Doctor.model.js";
import User from "../Model/User.model.js";

export const findOne = async (req, res, next) => {
    try {
        const doctor = await Doctor_detail.findByPk(req.params.id,{
            include: {
                model: User,
                attributes: ['email','name', 'phone', 'role'],
                required: true,
                where: {
                    role: 'Doctor'
                }
            }
        });
        
        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found" });
        }
        res.json(doctor);
    } catch (error) {
        console.log(error);
        next(error);
    }
};


export const getAlldoctors = async (req, res, next) => {
    try {
        const doctor = await Doctor_detail.findAll({
            include: {
                model: User,
                attributes: ['email','name', 'phone', 'role'],
                required: true,
                where: {
                    role: 'Doctor'
                }
            }
        });
        
        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found" });
        }
        res.json(doctor);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export async function createDoctor(user_id, specialization) {
    console.log(user_id);
    console.log(specialization);
    if (!user_id || !specialization) {
      throw new Error("UniqueId and specialization are required");
    }
    const UniqueId =user_id;
    const user = await User.findOne({ where: { UniqueId, role: "Doctor" } });
    if (!user) {
      throw new Error("User not found or not a doctor");
    }
  
    const doctor = await Doctor_detail.create({
      user_ID: UniqueId,
      specialization: specialization,
    });
  
    return doctor; 
}