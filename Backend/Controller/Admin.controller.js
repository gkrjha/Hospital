import Admin from "../Model/Admin.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const signup = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const existingAdmin = await Admin.findOne({ where: { email } });
        if (existingAdmin) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const admin = await Admin.create({
            email,
            password
        });

        res.status(200).json({ message: "Signup successful", admin });
    } catch (error) {
        next(error); // Handling errors
    }
};



const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            return res.status(400).json({ message: "Email not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Unauthorized" });
        }

        const token = jwt.sign(
            { adminId: admin.adminId, email: admin.email, role: admin.role },
            process.env.JWT_TOKEN,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        next(error);
    }
};


export { signup, login };
