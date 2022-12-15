const DataTypes = require("sequelize")

module.exports = (sequelize) =>
    sequelize.define("comment", {
        commentId: {
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
    });
