const Sequelize = require('sequelize')
const SessionModel = require('./models/session')
const StoryModel = require('./models/story')
const VoteModel = require('./models/vote')

const sequelize = new Sequelize(`sqlite:${__dirname}/database_development.db`)

const Session = SessionModel(sequelize, Sequelize)
const Story = StoryModel(sequelize, Sequelize)
const Vote = VoteModel(sequelize, Sequelize)

Session.hasMany(Story)
Story.hasMany(Vote)
Vote.belongsTo(Story)
Story.belongsTo(Session)

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  Session,
  Story,
  Vote
}
