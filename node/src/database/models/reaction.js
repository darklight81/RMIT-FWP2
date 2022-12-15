const DataTypes = require("sequelize")

module.exports = (sequelize) =>
    sequelize.define("reaction", {
        reactionId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        timestamps: true
    });
