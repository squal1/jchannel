import express from "express";

const app = express();
const port = process.env.PORT || 8000;

// End points
app.get("/", (req, res) => res.status(200).send("hello world"));

app.listen(port, () => console.log(`Example app listening on port ${port}`));
