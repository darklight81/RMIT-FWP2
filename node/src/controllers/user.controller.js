const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
    const users = await db.user.findAll();

    res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
    const user = await db.user.findByPk(req.params.id);
    if (user === null)
        res.statusCode = 404

    res.json(user);
};

// Select a user from the database by their username.
exports.username = async (req, res) => {
    const user = await db.user.findOne({ where: { username: req.params.username } });

    if (user === null)
        res.statusCode = 404

    res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
    const user = await db.user.findOne({ where: { username: req.body.username } })

    if (user === null || await argon2.verify(user.password, req.body.password) === false) {
        res.statusCode = 401
        res.json(null)
    } else
        res.json(user)
}

// Create a user in the database.
exports.create = async (req, res) => {
    const alreadyIn = await db.user.findOne({where: {username: req.body.username}});
    if (alreadyIn){
        res.statusCode = 409;
        res.json({"error": "user already exists"});
        return;
    }

    const password_hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
    let user;
    try {
        user = await db.user.create({
            username: req.body.username,
            password: password_hash,
            firstname: req.body.firstName,
            lastname: req.body.lastName
        });
    }
    // user already exists
    catch (e) {
        res.statusCode = 400;
        res.json(e);
    }
    res.json(user);
};

// Deletes a user from the database
exports.delete = async (req, res) => {
    const user = await db.user.findByPk(req.params.id);

    db.user.destroy({
        where : {
            "userId": req.params.id
        }
    }).then((response) => {
        if(response === 1){
            res.statusCode = 200;
        }
        else
            res.statusCode = 404;
        res.json(user)
    })
};

// Updates a user in the database
exports.update = async (req, res) => {
    const user = await db.user.findByPk(req.params.id);
    //req.body.forEach((update) => console.log(update));
    if (user === null){
        res.statusCode = 404;
        res.json({"error": "user not found"});
        return;
    }

    let arr = [];
    // Transform json to array
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
    user.set(json);
    await user.save();

    res.json(user);
}

// Get all friends of a user
exports.getFriends = async (req, res) => {
    const user = await db.user.findByPk(req.params.id);

    const friends = await db.friendship.findAll({
        where: {
            followerId: req.params.id
        }
    });

    res.json(friends);
}

// Get all posts of a user
exports.getPosts = async (req, res) => {
    const posts = await db.post.findAll({
        where: {
            authorId: req.params.id
        },
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
}
