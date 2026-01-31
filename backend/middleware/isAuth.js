import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => { 
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    
    
    req.userId = decoded.id || decoded._id; 
    
    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};


export default isAuth;