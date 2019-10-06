module.exports = (sequelize, type) => {
  return sequelize.define('vote', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    point: {
      type: type.INTEGER,
      allowNull: false
    },
    who: {
      type: type.INTEGER,
      allowNull: false
    }
  })
}
