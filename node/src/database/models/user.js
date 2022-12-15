const DataTypes = require("sequelize")

module.exports = (sequelize) =>
  sequelize.define("user", {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(32),
      unique: true
    },
    password: {
      type: DataTypes.STRING(96),
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    bio: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    timestamps: true
  });
