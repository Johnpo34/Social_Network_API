const { ObjectId } = require("mogoose").Types;
const res = require("express/lib/response");
const { Thought, User } = require("../models");

module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select("-__v")
        .then(async (thought) =>
        !thought
        ? res.status(404).json({ message: "no thought with that id."})
        : res.json({
            thought,
        })
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err)
        })
    },

    createThough(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id }},
                { new: true }
            );
        })
        .then((user) => 
        !user ? res.status(404).json({ message: "created thought but no user found"})
        : res.json( "created thought and added to user"
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        }));
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) => !thought ? res.status(404).json({ message: "no thought with that id"}) : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId}, { $set: req.body})
        .then((thought) => !thought ? res.status(404).json({ message: "no thought with that id"}) : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    addReaction(req, res) {
        console.log("adding reaction");
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            {$addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        )
        .then((thought) => !thought ? res.status(404).json({ message: "no thought with that id"}) : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        console.log("deleting reaction");
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { new: true }
        )
        .then((thought) => !thought ? res.status(404).json({ message: "no thought with that Id"}) : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
};