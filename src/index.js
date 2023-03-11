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
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

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

  res.redirect('/')
});

app.post("/buscar", (req, res) => {
  const { email } = req.body;

  client.GET(email, (err, reply) => {
    if (err) {
      console.log("el error fue papu: " + err);
      res.status(500).json({ error: "Ocurrió un error en el servidor" });
    } else {
      const jsonResponse = JSON.parse(reply);
      console.log(jsonResponse);
      if (Array.isArray(jsonResponse) && jsonResponse.length > 0) {
        const { name, phone, fechaNacimiento } = jsonResponse[0];
        console.log(name, phone, fechaNacimiento);
        res.render("buscar", { email, nombre: name, telefono: phone, fechaNacimiento });
      } else {
        console.log("La respuesta no contiene un objeto JSON válido");
        res.status(404).json({ error: "No se encontraron resultados" });
      }
    }
  });
});

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
