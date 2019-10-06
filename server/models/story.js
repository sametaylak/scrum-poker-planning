module.exports = (sequelize, type) => {
  return sequelize.define('story', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    storyName: {
      type: type.STRING,
      allowNull: false
    },
    status: {
      type: type.INTEGER,
      defaultValue: 1,
    },
    storyPoint: {
      type: type.INTEGER
    }
  })
}
