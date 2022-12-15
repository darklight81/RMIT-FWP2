const comments = [
  {
    postId: 1,
    authorId: 2,
    body: "Woah so lovely! 🥰",
  },
  {
    postId: 1,
    authorId: 1,
    body: "Async functions always return a promise. If the return value of an async function is not explicitly a promise, it will be implicitly wrapped in a promise.",
  },
  {
    postId: 1,
    parentId: 1,
    authorId: 1,
    body: "This is a nested comment.",
  },
]

async function seedComments(db) {
  const count = await db.comment.count();

  // Only seed data if necessary.
  if(count > 0)
    return;

  comments.forEach(async comment => {
    await db.comment.create(comment)
  })
}

module.exports = seedComments
