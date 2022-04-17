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
    content: {
        type: String,
        required: true,
    },
    reply: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reply",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastReplied: {
        type: Date,
        default: Date.now,
    },
    upVote: {
        type: Number,
        default: 0,
    },
    downVote: {
        type: Number,
        default: 0,
    },
});

var Thread = mongoose.model("Thread", threadSchema);

const replySchema = mongoose.Schema({
    floor: {
        type: Number,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    upVote: {
        type: Number,
        default: 0,
    },
    downVote: {
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
