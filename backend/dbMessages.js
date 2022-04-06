import mongoose from "mongoose";

const threadSchema = mongoose.Schema({
    postId: Number,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: { type: String, required: true },
    title: { type: String, required: true },
    upVote: Number,
    downVote: Number,
    content: { type: String, required: true },
    reply: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
    last_replied: { type: Date, default: Date.now },
});

var Thread = mongoose.model("Thread", threadSchema);

const replySchema = mongoose.Schema({
    floor: Number,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    time: Date,
    upVote: Number,
    downVote: Number,
    content: { type: String, required: true },
});

var Reply = mongoose.model("Reply", replySchema);

const userSchema = mongoose.Schema({
    userID: Number,
    userName: { type: String, required: true },
});

var User = mongoose.model("User", userSchema);

export { Thread, Reply, User };
