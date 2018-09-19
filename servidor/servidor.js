//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controlador = require('./controladores/controladorDeCompetencias');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/pelicula', controlador.buscarPeliculas);
app.get('/competencia', controlador.devolverGeneros);
app.get('/genero', controlador.devolverGeneros);
/* app.get('/peliculas/recomendacion', controlador.recomendar);
app.get('/peliculas/:id', controlador.devolverPorID); */


//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

