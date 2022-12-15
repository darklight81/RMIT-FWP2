module.exports = (express, app) => {
    const controller = require("../controllers/user.controller.js");
    const router = express.Router();

    // Select all users.
    router.get("/", controller.all);

    // Select user by id
    router.get("/:id", controller.one);

    // Select user by username
    router.get("/select/:username", controller.username);

    // Create new user, returns null if already exists
    router.post("/", controller.create);

    // Get all friends of user
    router.get("/:id/friends/", controller.getFriends);

    // Deletes the user
    router.delete("/:id", controller.delete);

    // Get all posts of user
    router.get("/:id/posts/", controller.getPosts);

    // Select one user from the database if username and password are a match.
    router.post("/login", controller.login);

    // Update user
    router.put("/:id", controller.update);

    // Add routes to server.
    app.use("/api/users", router);
};
