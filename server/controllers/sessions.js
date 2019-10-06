const express = require('express')
const router = express.Router()

const { Session, Story, Vote } = require('../sequelize')

// GET /sessions
//
router.get('/', async (_, res) => {
  const sessions = await Session.findAll({
    include: Story
  })
  res.json(sessions)
})

// POST /sessions
//
router.post('/', async (req, res) => {
  const sessionData = req.body
  sessionData.stories[0].status = 0

  const session = await Session.create(req.body, {
    include: Story
  })
  res.json(session)
})

// GET /sessions/sessionId
//
router.get('/:sessionId', async (req, res) => {
  const sessionId = req.params.sessionId
  const session = await Session.findByPk(sessionId, {
    include: {
      model: Story,
      include: Vote
    }
  })
  res.json(session)
})

module.exports = router
