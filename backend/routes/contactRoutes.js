const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const Message = require("../models/message");

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // ✅ 1. MongoDB me save
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // ✅ 2. Mail send setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ 3. Mail send
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // tumhe mail aayega
      subject: `New Contact: ${subject || "No Subject"}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    res.json({ success: true, message: "Message saved & email sent" });

  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;