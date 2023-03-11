const path = require('path');
const express = require("express");
const axios = require("axios");
const { createClient } = require("redis");
const { Entity, Schema } = require('redis')

const client = createClient({
  host: "127.0.0.1",
  port: 6379,
  legacyMode: true
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

(async () => {
  await client.connect();
})();

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname,'index.html'));
});

app.post("/guardar-formulario", (req, res) => {
  const {nombre,email,telefono,fecha_nacimiento} = req.body;

  const insert = [{
    "name": nombre,
    "phone":telefono,
    "fechaNacimiento":fecha_nacimiento
  }]

  client.set(email,JSON.stringify(insert));

  res.send("Holi")
  console.log("Holi")

  

  console.log(info);
});

app.post("/buscar", (req,res) => {
  const {email} = req.body;

  client.GET(email, (err, reply) => {
    if(err){
      console.log("el error fue papu: " + err);
    }else{
      console.log(JSON.parse(reply));
      
    }
  })
  res.send("holi")
  
  
})

app.get("/character", async (req, res) => {
  client.get("/character", async (err, reply) => {
    if (reply) {
      console.log("holi")
      console.log(reply);
    }
  });

  const response = await axios.get(
    "https://rickandmortyapi.com/api/character"
    );

  client.set("character", JSON.stringify(response.data), (err, reply) => {
    if (err) console.log(err);

    console.log(reply);

    res.json(response.data);
  });

  res.send("hola")
});

app.listen(3000);
console.log("server on port 3000");
