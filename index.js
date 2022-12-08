const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const { url } = require("inspector");

require("dotenv").config();
app.use(express.json());

app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

const client = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
});
client.connect();

app.get("/allsongs", async (req, res) => {
  const songs = await client.db("Portfolio").collection("Songs").find();

  const results = await songs.toArray();
  res.send(results);
});

app.get("/mymusic/:id", async (req, res) => {
  var id = req.params.id;
  var song = await client
    .db("Portfolio")
    .collection("Songs")
    .find({ name: id });
  song = await song.toArray();
  // console.log(song[0]);
  res.send(song[0]);
});

app.get("/mymusic/:id", async (req, res) => {
  var id = req.params.id;
  var song = await client
    .db("Portfolio")
    .collection("Songs")
    .find({ name: id });
  song = await song.toArray();
  // console.log(song[0]);
  res.send(song[0]);
});

app.use(express.static(path.join(__dirname, "/client")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Listening at port 5000");
});
