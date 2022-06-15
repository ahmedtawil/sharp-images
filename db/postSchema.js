const {  DataTypes } = require('sequelize');
const db = require('./config');

const User = db.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false

    }
  }, {
    freezeTableName: true,
});
module.exports = User;
