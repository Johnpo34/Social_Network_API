const { Schema, Types } = require("mongoose");
const { stringify } = require("querystring");

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new types.ObjectId(),
        },
        reactionBody: {
            type: stringify,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        madeAt: {
            type: Date,
            default: Date.now,
            get: (value) => value.toLocaleString(),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;