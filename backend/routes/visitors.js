const express = require('express')
const router = express.Router()
const Visitor = require('../models/Visitor')

router.post('/', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'
    const userAgent = req.headers['user-agent'] || ''
    const today = new Date().toISOString().split('T')[0]

    await Visitor.create({ ip, userAgent, date: today })

    const total = await Visitor.countDocuments()
    const todayCount = await Visitor.countDocuments({ date: today })

    res.json({ total, today: todayCount })
  } catch (err) {
    console.error('Visitor error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router