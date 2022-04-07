import express from "express";
import mongoose from "mongoose";
import { Thread, Reply, User } from "./dbMessages.js";
import { createRequire } from "module";

const app = express();
const port = process.env.PORT || 8000;

const require = createRequire(import.meta.url);
const jsonData = require("./keys.json");

// middleWare
app.use(express.json());

// DB
const CONNECTION_URL = jsonData.CONNECTION_URL;

mongoose.connect(CONNECTION_URL);

const db = mongoose.connection;

db.once("open", () => {
    console.log("DB connected");

    const threadCollection = db.collection("threads");
    const changeStream = threadCollection.watch();
});

// End points
app.get("/", (req, res) => res.status(200).send("hello world"));

// Get all threads under General category
app.get("/thread/category/general", (req, res) => {
    Thread.find({ category: "general" }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

// Get all threads under Gossip category
app.get("/thread/category/gossip", (req, res) => {
    Thread.find({ category: "gossip" }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

// Get all threads under Course&Profs category
app.get("/thread/category/course", (req, res) => {
    Thread.find({ category: "course" }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

// Get all threads under Job connections category
app.get("/thread/category/job", (req, res) => {
    Thread.find({ category: "job" }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

// Get all threads under user *needs to be tested*
app.get("/thread/user/:_id", (req, res) => {
    console.log(req.params._id);
    Thread.find({ author: req.params._id }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

// Get all replys of certain thread
app.get("/reply/thread/:_id", (req, res) => {
    Thread.findOne({ _id: req.params_id })
        .populate("reply")
        .exec((err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(data);
            }
        });
});

// Create new thread
app.post("/thread/new", (req, res) => {
    const dbMessage = req.body;

    Thread.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

// Delete test record
app.delete("/thread", (req, res) => {
    res.send("Got a DELETE request at /user");
    Thread.find({ __v: 0 }).deleteMany().exec();
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));

/* 
{
    "postId": 1,
    "author":"507f191e810c19729de860ea",
    "category": "General",
    "title": "Hello World",
    "upVote": 0,
    "downVote": 0,
    "content": "Hello",
    "reply": []
}

Insert refernced object id
https://stackoverflow.com/questions/30491468/how-to-insert-a-document-with-a-referenced-document-in-mongodb

*/
