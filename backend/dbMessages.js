import mongoose from "mongoose";

const threadSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    reply: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reply",
        },
    ],
    lastReplied: {
        type: Date,
        default: Date.now,
    },
});

var Thread = mongoose.model("Thread", threadSchema);

const replySchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },
    upvote: {
        type: Number,
        default: 0,
    },
    downvote: {
        type: Number,
        default: 0,
    },
});

var Reply = mongoose.model("Reply", replySchema);

const userSchema = mongoose.Schema({
    userID: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
});

var User = mongoose.model("User", userSchema);

export { Thread, Reply, User };
