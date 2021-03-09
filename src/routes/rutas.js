  
const express = require('express'); //guardar express en una variable de servidor
const router = express.Router(); //usar modulo de router de ex´press
const UserController = require('../Controllers/UserController');
const EncuestaController = require('../Controllers/EncuestaController');

/////////////////////////////////////////////////////////////////////////// USUARIOS /////////////////////////////////////////////////////////////////////////////////
//Acceder a login
router.get('/', (req, res) => {
	//res.send('holoo');
	res.render('Admin/Login.html');
});

//Iniciar logueo
router.post('/Login', UserController.login);
 
//Acceder formulario Registrar usuario

//Iniciar logueo
router.get('/Signup',  UserController.SignUp);
 
 
//Registrar usuario en db
router.post('/AddUser', UserController.save);
 
/////////////////////////////////////////////////////////////////////////// ENTRAR A HOME ///////////////////////////////////////////////////////////////////////////////
//Carga pagina principal
router.get('/home', UserController.HOME);

/////////////////////////////////////////////////////////////////////////// MENU ADMIN //////////////////////////////////////////////////////////////////////////////
//Acceder Menu admin
router.get('/Admin', (req, res) => {
	if (req.session.loggedin) {
		let data = {
			Tipo:  req.session.Tipo
		}
		if (req.session.Tipo.toLowerCase() == 'administrador') {
			res.render('Admin/Admin.html', {
				data: data
			});
		} else {
			res.render('Admin/Login.html');
		}
	} else {
		res.render('Admin/Login.html');
	}
	res.end();
});

router.get('/ObtenerUsuarios/', UserController.ObtenerUsuarios);

/////////////////////////////////////////////////////////////////////////// MENU ENCUESTAS //////////////////////////////////////////////////////////////////////////////
//====== Mostrar Menu Encuestas ========
router.get('/cEncuestas', (req, res) => {
	if (req.session.loggedin) {
		let data = {
			Tipo:  req.session.Tipo
		}
		res.render('Encuestas/EncuestasList.html', {
			data: data
		});
	} else {
		res.render('Admin/Login.html');
	}
	res.end();
});

//====== Crear Encuesta ========
router.get('/CrearEncuesta', (req, res) => {
	if (req.session.loggedin) {
		let data = {
			Tipo:  req.session.Tipo
		}
		res.render('Encuestas/PlantillaEncuesta.html', {
			data: data
		});
	} else {
		res.render('Admin/Login.html');
	}
	res.end();
});

//====== Mostrar Lista Encuestas ========
router.get('/ListaEncuestas/', EncuestaController.Kits);
//====== Mostrar Lista Encuestas ========
router.get('/DesplegarPregunta/:Variable', EncuestaController.DesplegarPregunta);
//====== Guardar Lista Logistica ========
//router.post('/NuevaImportacion', LogisiticaController.NuevaImportacion);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;