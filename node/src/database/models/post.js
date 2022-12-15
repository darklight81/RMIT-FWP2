const DataTypes = require("sequelize")

module.exports = (sequelize) =>
  sequelize.define("post", {
    postId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: true
  }
);
