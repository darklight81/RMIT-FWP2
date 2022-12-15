  const { Sequelize } = require("sequelize");
  const config = require("./config");

  const seedUsers = require("../seeds/user.seed");
  const seedPosts = require("../seeds/post.seed");
  const seedComments = require("../seeds/comment.seed");

  const db = {
    Op: Sequelize.Op
  };

  // Create Sequelize.
  db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT
  });

  // Include models.
  db.user = require("./models/user.js")(db.sequelize);
  db.post = require("./models/post.js")(db.sequelize);
  db.comment = require("./models/comment.js")(db.sequelize);
  db.friendship = require("./models/friendship.js")(db.sequelize);
  db.reaction = require("./models/reaction.js")(db.sequelize);

  // Define relations.

  db.user.hasMany(db.friendship, {foreignKey: {name: "followerId", allowNull: false}})
  db.user.hasMany(db.friendship, {foreignKey: {name: "followingId", allowNull: false}})

  db.user.hasMany(db.reaction, {foreignKey: {name: "userId", allowNull: false}})
  db.user.hasMany(db.comment, {foreignKey: {name: "authorId", allowNull: false}})

  db.post.hasMany(db.comment, {foreignKey: {name: "postId", allowNull: false}})
  db.post.hasMany(db.reaction, {foreignKey: {name: "postId", allowNull: false}})
  db.post.belongsTo(db.user, {foreignKey: {name: "authorId", allowNull: false}});

  db.comment.hasMany(db.comment, {foreignKey: {name: "parentId"}, })
  db.comment.belongsTo(db.user, {foreignKey: {name: "authorId", allowNull: false}});

  // Include a sync option with seed data logic included.
  db.sync = async () => {
    // Sync schema.
    //await db.sequelize.sync();

    // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
     await db.sequelize.sync({ force: true });

    await seedData();
  };

  async function seedData() {
    await seedUsers(db);
    await seedPosts(db);
    await seedComments(db);
  }

  module.exports = db;

  /*
   * References
   *  - Week 8 Tutorial
   */
