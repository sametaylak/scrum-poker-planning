module.exports = (sequelize, type) => {
  return sequelize.define('session', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sessionName: {
      type: type.STRING,
      allowNull: false
    },
    numOfVoter: {
      type: type.INTEGER,
      allowNull: false
    }
  })
}
