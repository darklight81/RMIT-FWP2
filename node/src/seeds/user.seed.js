const argon2 = require("argon2");

const users = [
  {
    username: "ryan",
    password: "password",
    firstname: "Ryan",
    lastname: "Tyson-Hurley",
  },
  {
    username: "igor",
    password: "password",
    firstname: "Igor",
    lastname: "Sulovsky",
  },
  {
    username: "moshe",
    password: "password",
    firstname: "Moshe",
    lastname: "Stone",
  },
]

async function seedUsers(db) {
  const count = await db.user.count();

  // Only seed data if necessary.
  if(count > 0)
    return;

  users.forEach(async user => {
    const password_hash = await argon2.hash(user.password, { type: argon2.argon2id });
    await db.user.create({ ...user, password: password_hash })
  })

  // TODO: Add a follow between users
}

module.exports = seedUsers
