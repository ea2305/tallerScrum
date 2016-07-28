var SESSIONS = [];
var ID_S = 0;
var express = require('express');
var router  = express.Router();
var mysql = require('mysql'); //FUNCIONES DE MYSQL

var database = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',// IMPORTANTE CAMBIA A CONFIGURACION DE EQUIPO
  database : 'Taller'
});

database.connect();

//Post
router.post('/login', function(req, res, next) {
	
	sess = req.session;
	//In this we are assigning email to sess.email variable.
	//email comes from HTML page.

	var E = req.body;//Reneme object

	console.log("----");
	console.log(E)

	//Creacion de sentencia
	var statement = 'SELECT nombre,idUser,type FROM USER WHERE (email=? AND password=?)';
	//Envio de paquetes de remplazo en statement por ?
	var data_set = [E.email,E.password];

	database.query(statement,data_set ,(err, rows, fields) => {
		if(!err){
			console.log("Insert was success [ok]");
			console.log( rows );
		}
		
		var a = rows.length;
		console.log( rows.length );
		if( a >= 1){
			SESSIONS.push(rows[0]);
			ID_S++;
			console.log(SESSIONS[0]);
			console.log(" ----- o");
			console.log(SESSIONS[0].nombre);
			
			console.log(rows[0].type);
			if(rows[0].type == 1){
				res.render('interface-ptc');	
				
			}else{
				res.render('interface-alumno');	
			}

		}else{
			res.render('login');	
		}
	});

});

//Post
router.post('/insertPolitica', function(req, res, next) {
	var E = req.body;//Reneme object

	//Creacion de sentencia
	var statement = 'INSERT INTO `POLITICA`(`idPolitica`,`nombreProfesor`,`titulo`,`politica`,`idUsuario`)VALUES' + 
	'(?,?,?,?)';
	//Envio de paquetes de remplazo en statement por ?
	var data_set = [null,E.nombreProfesor,E.titulo,E.politica,1];

	database.query(statement,data_set ,(err, rows, fields) => {
		if(!err){
			console.log("Insert was success [ok]");
			console.log( rows );
			res.render('formularioPoliticas')
		}else{
			res.render("formularioPoliticas");
		}
		
	});

});


//Obtenemos las politicas
router.post('/getPoliticas', function(req, res, next) {
	var E = req.body;//Reneme object

	//Creacion de sentencia
	var statement = 'SELECT * FROM POLITICA WHERE idUsuario = ?';


	database.query(statement, SESSIONS[(ID_S - 1)].idUser ,(err, rows, fields) => {
		if(!err){
			console.log("tabla: ");
			console.log( rows );
			res.send( rows )
		}else{
			res.send(undefined);
		}
		
	});

});

//Obtenemos las politicas
router.get('/getResult', function(req, res, next) {
	res.render('datos');
});


//Obtenemos las politicas
router.get('/getPoliticaResult', function(req, res, next) {
	var E = req.body;//Reneme object

	//Creacion de sentencia
	var statement = 'SELECT `idPolitica`,`aprovacion`,`rechazado`,`idUsuario`FROM `VOTACION_POLITICA` WHERE idUsuario = ?';


	database.query(statement, SESSIONS[(ID_S - 1)].idUser ,(err, rows, fields) => {
		if(!err){
			console.log("tabla: ");
			console.log( rows );
			res.send( rows )
		}else{
			res.send(undefined);
		}
		
	});
});



module.exports = router;
