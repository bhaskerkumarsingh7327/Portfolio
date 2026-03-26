const express = require("express");
const router = express.Router();

const Message = require("../models/message");

router.post("/", async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();

    res.json({ success: true, message: "Message saved" });
  } catch (error) {
    console.error("❌ FULL ERROR:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;