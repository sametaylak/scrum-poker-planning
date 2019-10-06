const express = require('express')
const router = express.Router()

const { Session, Story, Vote } = require('../sequelize')

// GET /votes/:storyId
//
router.get('/:storyId', async (req, res) => {
  const storyId = req.params.storyId
  const votes = await Vote.findAll({
    include: {
      model: Story,
      where: { id: storyId }
    }
  })
  res.json(votes)
})

// POST /votes/:storyId
// 
router.post('/:storyId', async (req, res) => {
  const storyId = req.params.storyId
  const story = await Story.findByPk(storyId, {
    include: Session
  })

  const storyVotes = await story.getVotes()
  if (storyVotes.length >= story.session.numOfVoter) {
    res.status(422)
    res.json({ error: "Number of Voters exceed" })
  }

  const vote = await Vote.create(req.body, {
    include: {
      model: Story,
      where: { id: storyId }
    }
  })
  res.json(vote)
})

module.exports = router
