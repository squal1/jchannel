import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt_decode from "jwt-decode";
import { createRequire } from "module";
import { Thread, Reply, User } from "./dbMessages.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 8000;

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//const jsonData = require("./keys.json");
const sslRedirect = require("heroku-ssl-redirect").default;
const cookieParser = require("cookie-parser");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
    "1094115480814-5vcn06vn4ifb3iafhnbhitpeci9emkm2.apps.googleusercontent.com"
);

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience:
            "1094115480814-5vcn06vn4ifb3iafhnbhitpeci9emkm2.apps.googleusercontent.com",
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
}

// middleWare
app.use(express.json());
app.use(cookieParser());
app.use(sslRedirect());
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:8000",
            "http://jchannel.herokuapp.com",
            "https://jchannel.herokuapp.com",
            "https://jchannel.herokuapp.com" + ":" + port,
        ],
        credentials: true,
    })
);

app.use(express.static(path.join(__dirname + "/client/build")));
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname + "/client/build")));
}

// DB
// const CONNECTION_URL = jsonData.CONNECTION_URL;

mongoose.connect(
    process.env.MONGODB_URI ||
        "mongodb+srv://admin:admin@cluster0.du5dk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("DB connected");
});

// End points

// Get a single thread using _id
// Param _id --> Object id of the thread
app.get("/thread", (req, res) => {
    const _id = req.query.id;

    Thread.findOne({ _id: _id })
        .sort({ lastReplied: -1 })
        .populate("author")
        .populate({
            path: "reply",
            populate: {
                path: "author quote",
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

// Get all threads
app.get("/threads", (req, res) => {
    const skip =
        req.query.skip && /^\d+$/.test(req.query.skip)
            ? Number(req.query.skip)
            : 0;
    Thread.find({})
        .sort({ lastReplied: -1 })
        .skip(skip)
        .limit(10)
        .populate("author")
        .populate({
            path: "reply",
            populate: {
                path: "author quote",
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

// Get threads of a category
// Param category --> "trending"/"general"/"gossip"/"course"/"job"
// Param skip --> skipping first n elements (0,10,20,30...)
app.get("/thread/category/:category", (req, res) => {
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
                path: "author quote",
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

// Search threads with string as a part of title
app.get("/thread/title", (req, res) => {
    const string = req.query.query;
    Thread.find({ title: { $regex: string, $options: "i" } })
        .sort({ lastReplied: -1 })
        .populate("author")
        .populate({
            path: "reply",
            populate: {
                path: "author quote",
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

// Get threads and sort by popularity
// Formula: popularity = 1.5*upvote + downvote + 2*reply - date^1.2
app.get("/thread/trending", (req, res) => {
    //const category = req.query.query;
    //query = { category: { category } };
    Thread.aggregate([
        // Match query (different category)
        // { $match: query },
        {
            $addFields: {
                dateDiff: {
                    $dateDiff: {
                        startDate: "$datePosted",
                        endDate: new Date(),
                        unit: "hour",
                    },
                },
            },
        },
        {
            $addFields: {
                dateScore: {
                    $multiply: ["$dateDiff", 1],
                },
                replyScore: {
                    $multiply: [{ $size: "$reply" }, 2],
                },
                upvoteScore: {
                    $multiply: ["$upvote", 1.5],
                },
                downvoteScore: {
                    $multiply: ["$downvote", 1],
                },
            },
        },
        {
            $addFields: {
                // Calculate total score
                score: {
                    $subtract: [
                        {
                            $add: [
                                "$replyScore",
                                "$upvoteScore",
                                "$downvoteScore",
                            ],
                        },
                        { $pow: ["$dateScore", 1.3] },
                    ],
                },
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "author",
            },
        },
        {
            $lookup: {
                from: "replies",
                localField: "reply",
                foreignField: "_id",
                as: "reply",
            },
        },
        { $unwind: "$reply" },
        {
            $lookup: {
                from: "users",
                localField: "reply.author",
                foreignField: "_id",
                as: "reply.author",
            },
        },
        {
            $lookup: {
                from: "replies",
                localField: "reply.quote",
                foreignField: "_id",
                as: "reply.quote",
            },
        },
        {
            $group: {
                _id: "$_id",
                author: { $first: "$author" },
                title: { $first: "$title" },
                category: { $first: "$category" },
                reply: { $push: "$reply" },
                lastReplied: { $first: "$lastReplied" },
                dateScore: { $first: "$dateScore" },
                replyScore: { $first: "$replyScore" },
                upvoteScore: { $first: "$upvoteScore" },
                downvoteScore: { $first: "$downvoteScore" },
                score: { $first: "$score" },
            },
        },
        { $unwind: "$author" },
        //sort by the score.
        { $sort: { score: -1 } },
        { $limit: 20 },
    ]).exec((err, data) => {
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
app.get("/reply/:_id", (req, res) => {
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
                path: "author quote",
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

    // Verify token
    verify(JSON.parse(req.cookies.loginToken).jwtToken).catch(console.error);

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

    // Verify token
    verify(JSON.parse(req.cookies.loginToken).jwtToken).catch(console.error);

    Thread.findOne({ _id: req.params._id })
        .select("reply")
        .exec((err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                // If reply > 500, stop the process
                if (data.reply.length >= 500) {
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
    const threadId = req.query.threadId;

    // Verify token
    verify(JSON.parse(req.cookies.loginToken).jwtToken).catch(console.error);

    Thread.updateOne(
        { _id: threadId },
        {
            $inc: { upvote: 1 },
        },
        (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        }
    );
    Reply.updateOne(
        { _id: req.params._id },
        {
            $inc: { upvote: 1 },
            $addToSet: {
                upvotedBy: userId,
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

// Downvote a reply
// Param id => id of the thread or reply
// Param userId => user id
app.post("/downvote/:_id", (req, res) => {
    const userId = req.query.userId;
    const threadId = req.query.threadId;

    // Verify token
    verify(JSON.parse(req.cookies.loginToken).jwtToken).catch(console.error);

    Thread.updateOne(
        { _id: threadId },
        {
            $inc: { downvote: 1 },
        },
        (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        }
    );

    Reply.updateOne(
        { _id: req.params._id },
        {
            $inc: { downvote: 1 },
            $addToSet: {
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

//User login
app.post("/login", (req, res) => {
    const jwtToken = JSON.stringify(req.body);
    const decodedJwtToken = jwt_decode(jwtToken);
    const user = {
        email: decodedJwtToken.email,
        name: decodedJwtToken.name,
    };
    // Verify token
    verify(req.body.jwtToken).catch(console.error);

    // Find and return the user object, create one if failed to find
    User.findOneAndUpdate(
        { email: decodedJwtToken.email },
        {
            user,
            $setOnInsert: {
                displayName: "User#" + Math.random().toString(36).slice(2, 10),
            },
        },
        { new: true, upsert: true },
        (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (data.banned === true) {
                    return res.status(403).json({
                        message:
                            "This account is banned. Logging in with this account is not allowed.",
                    });
                }
                res.status(200).send(data);
                console.log(data);
            }
        }
    );

    // Store jwt token to cookies
    res.cookie("loginToken", jwtToken, {
        httpOnly: true,
    });
});

// User logout
app.get("/logout", (req, res) => {
    res.clearCookie("loginToken");
    console.log("Login token cleared");
    res.status(200).send(res.data);
});

// See if user is already logged in
app.get("/user", (req, res) => {
    res.status(200).send(req.cookies.loginToken);
});

// Set displayname
app.post("/user/displayname", (req, res) => {
    const newName = req.query.newName;
    const email = req.query.email;

    // Verify token
    verify(req.body.jwtToken).catch(console.error);

    User.updateOne(
        { email: email },
        {
            $set: { nameChanged: true, displayName: newName },
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

// Get all threads created by a user
app.get("/user/profile", (req, res) => {
    const userId = req.query.userId;

    Thread.find({ author: userId })
        .sort({ lastReplied: -1 })
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

// Delete test record
app.delete("/thread", (req, res) => {
    res.send("Got a DELETE request at /user");
    Thread.find({ __v: 0 }).deleteMany().exec();
});

app.get("/*", function (req, res) {
    res.sendFile(
        path.join(__dirname, "client/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

app.listen(port, () => console.log(`App listening on port ${port}`));
