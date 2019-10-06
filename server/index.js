const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { Sessions, Stories, Votes } = require('./controllers')
const { Story } = require('./sequelize')

const app = express()

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}))

app.use(bodyParser.json())

app.get('/', (_, res) => {
  res.send('API Endpoint')
})

app.use('/sessions', Sessions)
app.use('/stories', Stories)
app.use('/votes', Votes)

app.post('/end/:sessionId/:storyId', async (req, res) => {
  const storyId = req.params.storyId
  const story = await Story.findByPk(storyId)
  story.update({
    storyPoint: req.body.point,
    status: 2
  })

  const sessionId = req.params.sessionId
  const nextStory = await Story.findOne({
    where: {
      sessionId,
      status: 1
    }
  })
  if (nextStory) {
    nextStory.update({
      status: 0
    })
    res.json(nextStory)
  }
  res.json({ status: 'no more story' })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Running on :${port}`)
})
