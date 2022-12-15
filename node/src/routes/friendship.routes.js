module.exports = (express, app) => {
    const controller = require("../controllers/friendship.controller.js");
    const router = express.Router();

    // Create new friendship
    router.post("/", controller.create);

    // Delete the friendship by id
    router.delete("/:id", controller.delete);

    app.use("/api/friendships", router);
};
