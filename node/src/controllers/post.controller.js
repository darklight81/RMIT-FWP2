const db = require("../database");

// Select all posts with author from the database.
exports.all = async (req, res) => {
  // Use eager loading to include the post author and comments
  const posts = await db.post.findAll({
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
  });

  res.json(posts);
};

// Select one post from the database.
exports.one = async (req, res) => {
  const post = await db.post.findByPk(
    req.params.id,
    { include: db.comment }
  );
  if (post === null) res.statusCode = 404;

  res.json(post);
}

// Create a post in the database.
exports.create = async (req, res) => {
  let post
  try{
    post = await db.post.create({
      authorId: req.body.authorId,
      body: req.body.body
    });
  } catch (err) {
    console.log(err);
    console.log(post)
  }
  res.json(post);
};

// Delete a post from the database.
exports.delete = async (req, res) => {
  const post = await db.post.findByPk(req.params.id);

  db.post.destroy({
    where: {
      postId: req.params.id
    }
  });

  // Also delete all comments to the post
    db.comment.destroy({
        where: {
            postId: req.params.id
        }
    });

  res.json(post);
}

// Update a post in the database.
// Updates user information
exports.update = async (req, res) => {
  const post = await db.post.findByPk(req.params.id);

  if (post === null) {
    res.statusCode = 404;
    res.json({"error": "Post not found."});
    return;
  }

  let arr = [];

  for (let key in req.body) {
    if (req.body[key] !== null && req.body[key] !== undefined && req.body[key] !== "") {
      arr.push([key, req.body[key]]);
    }
  }

  // Transform array to json
  let json = {};
  arr.forEach((update) => json[update[0]] = update[1]);

  console.log(json);
  console.log(req.body);
  post.set(json);
  await post.save();

  res.json(post);
}

// Get all comments to the post
exports.comments = async (req, res) => {
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
      postId: req.params.id,
      parentId: null
    }
  });

  res.json(comments);
}

// Get all reactions to the post
exports.reactions = async (req, res) => {
    const reactions = await db.reaction.findAll({
      where: {
        postId: req.params.id
      }
    });

    res.json(reactions);
}

// Add react to the post
exports.react = async (req, res) => {
  // todo: check if user already reacted to the post

  const reaction = await db.reaction.create({
    postId: req.body.postId,
    userId: req.body.userId,
    type: req.body.type
  });

  res.json(reaction);
}

// Remove a reaction from the post
exports.unreact = async (req, res) => {

  // find a reaction by post id and user id
  const reaction = await db.reaction.findOne({
    where: {
      postId: req.params.id,
      userId: req.params.userId
    }
  });

  db.reaction.destroy({
    where: {
      postId: req.params.id,
      userId: req.params.userId
    }
  });

  res.json(reaction);
}

// Post a comment to the post
exports.comment = async (req, res) => {
  const comment = await db.comment.create({
    body: req.body.body,
    postId: req.body.postId,
    authorId: req.body.authorId
  });

  res.json(comment);
}
