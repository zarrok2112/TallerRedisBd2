//Importar express y redis
const express = require('express');
const redis = require('redis');

//crear aplicacion usando express
const app = express()
const port = 6379

app.use(
    express.urlencoded({
      extended: true
    })
  )

app.use(express.static(__dirname + '/public/index.html'));


//crear instancia de Redis
const client = redis.createClient();

//uso de app para express
app.use(
    express.json({
        type: "*/*"
    })
)

//app.use(redis());

//Prueba funcion de redis

client.on('connect', function() {
    console.log('Conectado a Redis');
});

client.on('error', function (err) {
    console.log('Error de Redis:', err);
});

//crear perfil


//para obtener perfil


app.listen(port, () => {
    console.log('Estoy ejecutandome en http://localhost:'+port+'/');
  })






