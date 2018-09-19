//Archivo todo creado por mi
var con = require('../lib/conexionbd');

function devolverPeliculas(req, res) {
    var sql = "select * from pelicula"
    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        var response = {
            'peliculas': resultado
        };
        res.send(JSON.stringify(response));
    });
};

function devolverGeneros(req, res) {
    var sql = "select * from genero"
    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        var response = {
            'generos': resultado
        };
        res.send(JSON.stringify(response));
    });
};

function buscarPeliculas(req, res) {
    var titulo = req.query.titulo;
    var anio = req.query.anio;
    var genero = req.query.genero_id;
    var orden = req.query.columna_orden;
    var tipoOrden = req.query.tipo_orden;
    var cantidad = req.query.cantidad;
    var pagina = req.query.pagina;
    var sql = 'select * from pelicula where id >0';
    var sqlTotal = 'select count(id) as CantidadPeliculas from pelicula where id >0';
    var limite = ' LIMIT ' + cantidad;
    var total = 0;
    var start = cantidad * (pagina - 1);

    if (titulo) {
        sql = sql + ' AND titulo like "%' + titulo + '%"';
        sqlTotal = sqlTotal + ' AND titulo like "%' + titulo + '%"';
    }
    if (anio) {
        sql = sql + ' AND anio=' + anio;
        sqlTotal = sqlTotal + ' AND anio=' + anio;
    }
    if (genero > 0) {
        sql = sql + ' AND genero_id=' + genero;
        sqlTotal = sqlTotal + ' AND genero_id=' + genero;
    }

    con.query(sqlTotal, function(error, resultadoTotal) {
        total = resultadoTotal[0].CantidadPeliculas;
    });

    if (pagina === 1) {
        sql = sql + ' ORDER BY ' + orden + ' ' + tipoOrden + limite;
    }

    else {
        sql = sql + ' ORDER BY ' + orden + ' ' + tipoOrden + limite + ' OFFSET ' + start;
    };

    con.query(sql, function(error, resultado) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        if (resultado.length == 0) {
            console.log("No se encontró ninguna pelicula con ese titulo");
            return res.status(404).send("No se encontró ninguna pelicula con ese titulo");
        }
        else {
            var response = {
                'peliculas': resultado,
                'total': total
            };
            res.send(JSON.stringify(response));
        };
    });
};

function devolverPorID(req, res) {
    var id = req.params.id;
    var listaActores;

    var sqlActor = "select actor.nombre from actor inner join actor_pelicula on actor.id = actor_pelicula.actor_id inner join pelicula on actor_pelicula.pelicula_id = pelicula.id where pelicula.id =" + id;
    con.query(sqlActor, function(error, resultado) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        if (resultado.length == 0) {
            console.log("No se encontró ninguna pelicula con ese id");
            return res.status(404).send("No se encontró ninguna pelicula con ese id");
        }
        else {
            listaActores = resultado;
        };
    });
    
    var sql = "select pelicula.*, genero.nombre , actor.nombre as actor from pelicula inner join genero on pelicula.genero_id = genero.id inner join actor_pelicula on pelicula.id = actor_pelicula.pelicula_id inner join actor on actor_pelicula.actor_id = actor.id where pelicula.id =" + id;
    con.query(sql, function(error, resultado) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        if (resultado.length == 0) {
            console.log("No se encontró ninguna pelicula con ese id");
            return res.status(404).send("No se encontró ninguna pelicula con ese id");
        }
        else {
            /* for (var i = 0; i < resultado.length; i++) {
                listaActores = resultado[i].actor;
            }; */
            var response = {
                'pelicula': resultado[0],
                'actores': listaActores
            };
            res.send(JSON.stringify(response));
        };
    });
};

function recomendar(req, res) {
    var genero = req.query.genero;
    var anio_inicio = req.query.anio_inicio;
    var anio_fin = req.query.anio_fin;
    var puntuacion = req.query.puntuacion;
    var sql = 'select pelicula.*, genero.nombre from pelicula inner join genero on pelicula.genero_id = genero.id where genero.nombre = "' + genero + '"';

    if (anio_inicio) {
        sql = sql + ' AND anio BETWEEN ' + anio_inicio + ' AND ' + anio_fin;
    }
    if (puntuacion) {
        sql = sql + ' AND puntuacion = ' + puntuacion;
    }

    con.query(sql, function(error, resultado) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        if (resultado.length == 0) {
            console.log("No se encontró ninguna pelicula con ese criterio");
            return res.status(404).send("No se encontró ninguna pelicula con ese criterio");
        }
        else {
            var response = {
                'peliculas': resultado
            };
            res.send(JSON.stringify(response));
        };
    });
}

module.exports = {
    devolverPeliculas: devolverPeliculas,
    buscarPeliculas: buscarPeliculas,
    devolverGeneros: devolverGeneros,
    devolverPorID: devolverPorID,
    recomendar: recomendar
};