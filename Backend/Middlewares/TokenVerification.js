import jwt from "jsonwebtoken";


const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ error: "Access denied, token required" });
    }

    try {
        const decoded = jwt.verify(token, "your_secret_key");
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};


const ErrorHandler = (err, req, res, next) => {
    console.log("Middleware Error Hadnling");
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
    console.log(errMsg);
    
}

export  { ErrorHandler, verifyToken }
