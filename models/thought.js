const { Schema, model } = require("mongoose");
const { stringify } = require("querystring");

const reactionSchema = require ("./Reaction");
const { Thought } = require("./user");

const time = {
    timestapms: { currentTime: () => Math.floor(Date.now() / 1000) },
};

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: stringify,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        madeAt: {
            type: Date,
            default: Date.now,
            get: (value) => value.toLocaleString(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

thoughtSchema.virtual("reactionCount").get(function () {
    return `${this.reactions.length}`;
})

const Thought = model("Though", thoughtSchema);
module.exports = Thought;