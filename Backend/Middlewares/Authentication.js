
const isAdmin = (req, res, next) => {
   
    if (!req.user || req.user.role !== 'Admin') {
        return res.status(403).json({ message: "Access denied, Admin role required" });
    }
    next(); 
};

export default isAdmin;
