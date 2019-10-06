const express = require('express')
const router = express.Router()

const { Session, Story } = require('../sequelize')

// GET /stories/:sessionId
//
router.get('/:sessionId', async (req, res) => {
  const sessionId = req.params.sessionId
  const stories = await Story.findAll({
    include: {
      model: Session,
      where: { id: sessionId }
    }
  })
  res.json(stories)
})

module.exports = router
