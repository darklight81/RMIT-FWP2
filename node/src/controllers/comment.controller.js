const db = require("../database");

// Create a new comment in the database
exports.create = async (req, res) => {
  const comment = await db.comment.create({
    body: req.body.body,
    postId: req.body.postId,
    authorId: req.body.authorId,
    parentId: req.body.parentId,
  });

  res.json(comment);
}

// Delete a comment from the database
exports.delete = async (req, res) => {
  const comment = await db.comment.findByPk(req.params.id);
  if (comment) {
    await db.comment.destroy({
        where: {
            parentId: req.params.id
        }
    });
    comment.destroy();
  }

  res.json(comment);
}

// Update a comment in the database
exports.update = async (req, res) => {
  const comment = await db.comment.findByPk(req.params.id);

  db.comment.update({
    body: req.body.body,
  }, {
    where: {
      commentId: req.params.id
    }
  });

  res.json(comment);
}

// Get comments by parentId
exports.replies = async (req, res) => {
    const comments = await db.comment.findAll({
      include: [
        {
          model: db.user,
          attributes: [
            'userId',
            'username',
            'firstname',
            'lastname',
          ]
        },
      ],
      where: {
        parentId: req.params.id
      }
    });

    res.json(comments);
}
