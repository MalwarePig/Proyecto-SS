const express = require('express');
const morgan = require('morgan'); //ver las peticiones
const app = express(); //servidor
const path = require('path'); //Traba con directorios identificando el SO // \\
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const session = require('express-session');

//Configuracion Servidor
app.set('port', process.env.PORT || 3000) //asignar puerto, si lo da el So que lo tome, sino el 3000
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile); //usara el motor ejs para archivos html
app.set('view engine', 'ejs'); //motor de plantillas, permite ejecutar javascript y traducirlo a html

//middlewares //Funciones que se ejecutan antes que lleguen a las rutas
app.use(express.json()); //Acceder a la informacion de jason
app.use(morgan('dev')); //muestra los mensajes en consola de las cargas y peticiones
app.use(myConnection(mysql, {
     host: 'localhost', // host:'localhost',
     user: 'root', //user: 'root',
     password: 'Soporte1702861',
     port: 3306,
     database: 'proyectoss'
}, 'single'))

app.use(session({
     secret: 'keyboard cat', //semilla para criptografia en la seguridad que se envia el id al cliente
     resave: true, //Guarda los cambios en cada cambio que se haga en los datos de sesion
     rolling: true, //Entre resave y rolling toman el tiempo para expirar la sesion
     saveUninitialized: true, //Inicializa la variable de sesion aun sin guardar datos
     cookie: {
          expires: 60 * 60 * 10000 //5 minutos de inactividad y se cierra la sesion
     }
}))

/*var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));*/

//Mandar archivos mayores por POST
var bodyParser = require('body-parser');
app.use(bodyParser.json({
     limit: '50mb'
}));
app.use(bodyParser.urlencoded({
     limit: '50mb',
     extended: true,
     parameterLimit: 1000000
}));



app.use(express.urlencoded({
     extended: false
})); //para que el servidor entienda los datos del navegador al hacer un guardado de formulario
/*
app.get('/', function (req, res) {
     res.send('Hello World')
   })*/
//routes o urls
app.use(require('./routes/rutas.js')); //usar las rutas

//Escuchando el servidor
app.listen(app.get('port'), () => {
     console.log('servidor escuchando en puerto: ', app.get('port'));
});

//file statics
app.use(express.static(path.join(__dirname, 'public'))); //para archivos como imagenes,css,javascript

//ERROR 404
app.use('*', function (req, res, next) {
     res.status(404).render('Admin/Error.html');
     next();
});