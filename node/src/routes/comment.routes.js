module.exports = (express, app) => {
    const controller = require("../controllers/comment.controller.js");
    const router = express.Router();

    // Create new comment
    router.post("/", controller.create);

    // Delete the comment by id
    router.delete("/:id", controller.delete);

    // Update the comment by id
    router.put("/:id", controller.update);

    // Get comments by parentId
    router.get("/:id", controller.replies);

    app.use("/api/comments", router);
};
