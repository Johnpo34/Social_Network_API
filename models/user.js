const { Schema, model } = require("mongoose");
// email validation

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator (email){return /^\S+@\S+\.\S+$/.test(email)}
            }
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
        friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model("User", userSchema);
module.exports = User;