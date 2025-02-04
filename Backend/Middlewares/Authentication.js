
const isAdmin = (req, res, next) => {
   
    if (!req.user || req.user.role !== 'Admin') {
        return res.status(403).json({ message: "Access denied, Admin role required" });
    }
    next(); 
};

export const isDoctor = (req, res, next) => {
   
    if (!req.user || req.user.role !== 'Doctor') {
        return res.status(403).json({ message: "Access denied, Doctor role required" });
    }
    next(); 
};

export const isPatient = (req, res, next) => {
   
    if (!req.user || req.user.role !== 'Patient') {
        return res.status(403).json({ message: "Access denied, Patient role required" });
    }
    next(); 
};

export default isAdmin;
