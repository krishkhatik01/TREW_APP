import jwt from 'jsonwebtoken';

const genToken = (userId) => {
    try {
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: "10y",
        });
        return token;
    } catch (error) {
        return res.status(500).json({ message: "Token generation failed", error }); 
        
    }
};

export default genToken;