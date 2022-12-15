const posts = [,
  {
    authorId: 2,
    body: "This is the second post. 👏"
  },
  {
    authorId: 1,
    body: "This is the first post. 👀"
  }
]

async function seedPosts(db) {
  const count = await db.post.count();

  // Only seed data if necessary.
  if(count > 0)
    return;

  posts.forEach(async post => {
    await db.post.create(post)
  })
}

module.exports = seedPosts
