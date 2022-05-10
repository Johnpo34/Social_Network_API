const router = require("express").Router();

const {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require("../../controllers/userController");

router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route("/:userID")
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

router
    .route("/api/users/:userId/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend);

    
module.exports = router;