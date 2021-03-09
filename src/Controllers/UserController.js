const Controller = {};

/////////////////////////////////////////////////////////////////////--------------- REGISTRO ----------------------/////////////////////////////////////////////////////////////////////
Controller.save = (req, res) => {
    const data = req.body;
    const nombre = req.body.Planta;
    req.getConnection((err, conn) => {

        conn.query('INSERT INTO usuarios set ?', [data], (err, ot) => {
            res.redirect('/Signup');
        });
    })
    /* console.log(req.body);//se obtienen los datos del formulario a traves del req.body
     res.send('works');*/
}

/////////////////////////////////////////////////////////////////////--------------- LOGIN ----------------------/////////////////////////////////////////////////////////////////////
Controller.login = (req, res) => {
    req.session.Usuario = req.body.username;
    const username = req.body.username;
    const password = req.body.pass;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios WHERE Usuario = ? AND Contrasena = ?', [username, password], (error, results, fields) => {
            if (error) {
                console.log(error);
                res.redirect('/');
                console.log('error en query');
            } else if (Object.keys(results).length > 0) //si contiene almenso 1 resultado entra
            {
                const id = results[0].id //Obtener contraseña de la consulta
                const Contrasena = results[0].Contrasena //Obtener contraseña de la consulta
                const Usuario = results[0].Usuario //Obtener contraseña de la consulta
                const Tipo = results[0].Tipo //Obtener nivel de la consulta
                const Nombre = results[0].Nombre //Obtener nivel de la consulta

                if (password == Contrasena) { //si las contraseñas coinciden entran
                    req.session.loggedin = true;
                    req.session.idDB = id;
                    req.session.username = username;
                    req.session.Tipo = Tipo;

                    let Datos = {
                        username: Usuario,
                        Tipo: Tipo,
                        Nombre: Nombre
                    }
                    console.log(Datos)
                    res.render('index.html', {
                        data: Datos
                    });
                    //res.send('works');
                } else { //si las contraseñas no coinciden
                    console.log('error de contraseña');
                }
            } else //sin resultados
            {
                res.redirect('/');
                console.log('Error usaurio o contraseña');
            }
            //response.end();
        });
    })
}

/////////////////////////////////////////////////////////////////////--------------- SignUp ----------------------/////////////////////////////////////////////////////////////////////
Controller.SignUp = (req, res) => {
    req.getConnection((err, conn) => {
        if (req.session.loggedin) {
            conn.query('SELECT * FROM usuarios', [], (error, results, fields) => {
                if (error) {
                    console.log(error);
                    res.redirect('/');
                    console.log('error en query');
                } else if (Object.keys(results).length > 0) //si contiene almenso 1 resultado entra
                {
                    let data = {
                        Tipo: req.session.Tipo
                    }
                    res.render('Admin/Signup.html', {
                        data: data
                    });
                }
            });
        } else {
            res.redirect('/');
        }
    })
}

Controller.ObtenerUsuarios = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios', [], (error, results, fields) => {
            if (error) {
                console.log(error);
                res.redirect('/');
                console.log('error en query');
            } else if (Object.keys(results).length > 0) //si contiene almenso 1 resultado entra
            {
                res.json(results);
            }
        });
    })
}


/////////////////////////////////////////////////////////////////////--------------- HOME ----------------------/////////////////////////////////////////////////////////////////////
Controller.HOME = (req, res) => {
    req.getConnection((err, conn) => {
        if (req.session.loggedin) {
            console.log("EN home");
            conn.query("SELECT * FROM usuarios WHERE usuario = '" + req.session.username + "'", (err, user) => {
                if (err) {
                    console.log('Error de lectura');
                }
                console.log(user);
                res.render('index.html', {
                    data: user
                });
            });
        } else {
            res.redirect('/');
        }
    })
}




module.exports = Controller;