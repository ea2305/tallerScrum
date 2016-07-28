var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	sess = req.session;

	//if(sess.idUser){
	//	res.render('interface-alumno');
	//}else{
		res.render('index');	
	//}
  	
});

router.get('/formularioPoliticas', function(req, res, next) {
  res.render('formularioPoliticas');
});

router.get('/interface-alumno', function(req, res, next) {
  res.render('interface-alumno');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
	