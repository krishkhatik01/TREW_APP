import User from "../models/user.model.js"; 

export const getCurretUser = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("Searching for User ID:", userId);

   
    const user = await User.findById(userId).select("-password"); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Database Error:", error.message); 
    return res.status(500).json({ 
      message: "Error fetching user", 
      error: error.message
    });
  }
};