import express from "express";
import mongoose from "mongoose";
import { Thread, Reply, User } from "./dbMessages.js";

const app = express();
const port = process.env.PORT || 8000;

// middleWare
app.use(express.json());

// DB
const connection_url =
    "mongodb+srv://admin:admin@cluster0.du5dk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(connection_url);

// End points
app.get("/", (req, res) => res.status(200).send("hello world"));

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

app.listen(port, () => console.log(`Example app listening on port ${port}`));
