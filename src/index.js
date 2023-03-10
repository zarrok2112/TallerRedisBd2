const express = require("express");
const axios = require("axios");
const { createClient } = require("redis");

const client = createClient({
  host: "127.0.0.1",
  port: 6379,
});

const app = express();

(async () => {
  await client.connect();
})();

app.get("/character", async (req, res) => {
  client.get("/character", async (err, reply) => {
    if (reply) {
      console.log(reply);
    }
  });

  const response = await axios.get("https://rickandmortyapi.com/api/character");

  client.set("character", JSON.stringify(response.data), (err, reply) => {
    if (err) console.log(err);

    console.log(reply);

    res.json(response.data);
  });
});

app.listen(3000);
console.log("server on port 3000");
