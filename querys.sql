CREATE TABLE `competencia` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `nombre` varchar(70) NOT NULL DEFAULT '',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `competencia`
VALUES (1,'¿Cuál es la mejor película?'),(2,'¿Cuál es más divertida?'),(3,'¿Cuál peli merece una secuela?'),(4,'¿Cuál peli merece ser vista en el cine?'),(5,'¿Cuál de las dos no volverías a ver jamás?'),(6,'¿Cuál creés que fue más difícil de realizar?');