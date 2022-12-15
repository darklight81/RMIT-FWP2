module.exports = (express, app) => {
    const controller = require("../controllers/post.controller.js");
    const router = express.Router();

    // Select all posts.
    router.get("/", controller.all);

    // Select post by id
    router.get("/:id", controller.one);

    // Create new post, returns null if already exists
    router.post("/", controller.create);

    // Update a post.
    router.put("/:id", controller.update)

    // Delete the post by id
    router.delete("/:id", controller.delete);

    // Get all comments to the post
    router.get("/:id/comments", controller.comments);

    // Add reactions to the post
    router.post("/:id/reactions", controller.react);

    // Get all reactions of the post
    router.get("/:id/reactions", controller.reactions);

    // Delete a reaction from the post
    router.delete("/:id/reactions/:userId", controller.unreact);

    // Post a comment to the post
    router.post("/:id/comments", controller.comment);

    // Add routes to server.
    app.use("/api/posts", router);
};
