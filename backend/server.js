import express from "express";
import mongoose from "mongoose";
import { Thread, Reply, User } from "./dbMessages.js";
import { createRequire } from "module";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000;

const require = createRequire(import.meta.url);
const jsonData = require("./keys.json");

// middleWare
app.use(express.json());
app.use(cors());

// DB
const CONNECTION_URL = jsonData.CONNECTION_URL;

mongoose.connect(CONNECTION_URL);

const db = mongoose.connection;

db.once("open", () => {
    console.log("DB connected");
});

// End points
app.get("/", (req, res) => {
    // REDIRECT goes here
    res.redirect("/category");
});

// Get threads of a category
// Param category --> "trending"/"general"/"gossip"/"course"/"job"
// Param skip --> skipping first n elements (0,10,20,30...)
app.get("/thread/:category", (req, res) => {
    const skip =
        req.query.skip && /^\d+$/.test(req.query.skip)
            ? Number(req.query.skip)
            : 0;
    Thread.find({ category: req.params.category })
        .sort({ lastReplied: -1 })
        .skip(skip)
        .limit(10)
        .populate("author")
        .populate({
            path: "reply",
            populate: {
                path: "author",
            },
        })
        .exec((err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(data);
            }
        });
});

// Get replies of a thread
// Param _id --> id of the thread
// Param skip --> skipping first n elements (0,25,50,75...)
// Param count --> number of replies returning (default:25)
app.get("/thread/reply/:_id", (req, res) => {
    const skip =
        req.query.skip && /^\d+$/.test(req.query.skip)
            ? Number(req.query.skip)
            : 0;
    const count =
        req.query.count && /^\d+$/.test(req.query.count)
            ? Number(req.query.count)
            : 25;
    Thread.findOne({ _id: req.params._id })
        .select("reply")
        .populate({
            path: "reply",
            populate: {
                path: "author",
            },
        })
        .slice("reply", [skip, count])
        .exec((err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(data);
            }
        });
});

// Create new thread
app.post("/thread", (req, res) => {
    const dbMessage = req.body;

    Thread.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

// Create new reply to a thread
// Param _id --> id of the thread to be replied
app.post("/reply/:_id", (req, res) => {
    const dbMessage = req.body;

    // Check reply number (>=500)
    Thread.findOne({ _id: req.params._id })
        .select("reply")
        .exec((err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (data.reply.length >= 500) {
                    // Maximum reply reached
                    return res.status(500).json({
                        message:
                            "Maximum reply number reached. Replying to this thread is not allowed",
                    });
                } else {
                    // If reply < 500, create reply
                    Reply.create(dbMessage, (err, data) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.status(201).send(data);
                            // If success, insert reply into the corresponding thread
                            Thread.updateOne(
                                { _id: req.params._id },
                                {
                                    $push: { reply: data._id },
                                    $set: { lastReplied: new Date() },
                                },
                                (err, data) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log(data);
                                    }
                                }
                            );
                        }
                    });
                }
            }
        });
});

// Upvote a reply
// Param id => id of the thread or reply
// Param userId => user id
app.post("/upvote/:_id", (req, res) => {
    const userId = req.query.userId;

    Reply.updateOne(
        { _id: req.params._id },
        {
            $inc: { upvote: 1 },
            $push: {
                upvotedBy: userId,
            },
        },
        (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        }
    );
});

// Downvote a reply
// Param id => id of the thread or reply
// Param userId => user id
app.post("/downvote/:_id", (req, res) => {
    const userId = req.query.userId;

    Reply.updateOne(
        { _id: req.params._id },
        {
            $inc: { downvote: 1 },
            $push: {
                downvotedBy: userId,
            },
        },
        (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(data);
            }
        }
    );
});

// Get all threads under user *needs to be tested*
//app.get("/thread/user/:_id", (req, res) => {
//    console.log(req.params._id);
//    Thread.find({ author: req.params._id }, (err, data) => {
//        if (err) {
//            res.status(500).send(err);
//        } else {
//            res.status(200).send(data);
//        }
//    });
//});

// Create new user
//app.post("/user/new", (req, res) => {
//    const dbMessage = req.body;
//
//    User.create(dbMessage, (err, data) => {
//        if (err) {
//            res.status(500).send(err);
//        } else {
//            res.status(201).send(data);
//        }
//    });
//});

// Delete test record
app.delete("/thread", (req, res) => {
    res.send("Got a DELETE request at /user");
    Thread.find({ __v: 0 }).deleteMany().exec();
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
