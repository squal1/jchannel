import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt_decode from "jwt-decode";
import { createRequire } from "module";
import { Thread, Reply, User } from "./dbMessages.js";

const app = express();
const port = process.env.PORT || 8000;

const require = createRequire(import.meta.url);
const jsonData = require("./keys.json");
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
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

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

    // Verify token
    verify(JSON.parse(req.cookies.loginToken).jwtToken).catch(console.error);

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

    // Verify token
    verify(JSON.parse(req.cookies.loginToken).jwtToken).catch(console.error);

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

app.listen(port, () => console.log(`Example app listening on port ${port}`));
