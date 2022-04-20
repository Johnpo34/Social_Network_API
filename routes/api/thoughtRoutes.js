const router = require("express").Router();

const {
    getThoughts,
    getOneThought,
    updateThought,
    addReaction,
    deleteReaction,
    deleteThought,
    createThought,
} = require("../../controllers/thoughtController");

router
    .route("/")
    .get(getThoughts)
    .post(createThought);

router
    .route("/:thoughId")
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought);

router
    .route("/:thoughId/reactions")
    .post(addReaction);

router
    .route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction);

    
module.exports = router;