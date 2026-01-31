import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,       
  secure: true,   
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD 
  },
});

const sendMail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"TREW Support" <${process.env.EMAIL}>`, 
      to,
      subject: "Reset your password - TREW",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #000;">Password Reset Request</h2>
          <p>Your OTP for password reset is:</p>
          <h1 style="color: #000; letter-spacing: 5px;">${otp}</h1>
          <p style="color: #555;">This code will expire in <b>5 minutes</b>.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      ` 
    });

    console.log("Email Sent Successfully: ", info.messageId);
    return info;
  } catch (error) {
    console.error("Nodemailer Detailed Error: ", error.message);
    throw error; 
  }
}

export default sendMail;