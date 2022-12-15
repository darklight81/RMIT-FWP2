const db = require("../database");

// Creates a new friendship in the database
exports.create = async (req, res) => {
    const friendship = await db.friendship.create({
        followerId: req.body.followerId,
        followingId: req.body.followingId
    });
    res.json(friendship);
}

// Deletes a friendship from the database
exports.delete = async (req, res) => {
    const friendship = await db.friendship.findByPk(req.params.id);

    db.friendship.destroy({
        where: {
            friendshipId: req.params.id
        }
    });

    res.json(friendship);
}
