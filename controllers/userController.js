const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");
const thoughtController = require("./thoughtController");

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getOneUser(req, res) {
        User.findOne({ id: req.params.userID })
            .populate({ path: "thoughts", select: "-__v" })
            .populate({ path: "friends", select: "-__v" })
            .then(async (user) => !user ? res.status(404).json({
                message: "No user with that ID"
            })
                : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ id: req.params, userid })
            .then((user) => !user ? res.status(404).json({ message: "No user exists" }) : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: "User and thoughts removed" }))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate({ id: req.params.userId }, { $set: req.body }).then((user) => !user ? res.status(404).json({
            message: "No user with this ID"
        })
            : res.json(user)
        )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    addFriend(req, res) {
        console.log("adding a friend");
        User.findOneAndUpdate(
            { id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) => !user ? res.status(404).json({ message: "No user with that id" })
                : res.json({ user })
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        console.log("removing friend from list");
        User.findOneAndUpdate(
            { id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) =>
                !user ? res.status(404).json({
                    message: "No user with that Id"
                })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};
