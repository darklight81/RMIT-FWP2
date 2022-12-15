const DataTypes = require("sequelize")

module.exports = (sequelize) =>
    sequelize.define("friendship", {
        friendshipId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, {
        timestamps: true
    });
