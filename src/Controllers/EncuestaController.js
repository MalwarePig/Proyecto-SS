const Controller = {};

///////// == Kits == ////////////////////////////// == Kits == ////////////////////////////// == Kits == ////////////////////////// == Kits == //////////////////// == Kits == ///////////////////// == Kits == ////////////////
Controller.Kits = (req, res) => {
    if (req.session.loggedin) {
        //res.send('Metodo Get list');
        req.getConnection((err, conn) => {
            const {Variable} = req.params;
            conn.query("SELECT * FROM MenuEncuesta", (err, Kits) => {
                if (err) {
                    console.log('Error de lectura');
                }
                console.table(Kits);
                res.json(Kits);
            });
        });
    } else {
        res.render('Login.html');
    }
};

///////// == Componentes == ////////////////////////////// == Componentes == ////////////////////////////// == Componentes == ////////////////////////// == Componentes == //////////////////// == Componentes == ///////////////////// == Componentes == ////////////////
Controller.DesplegarPregunta = (req, res) => {
    if (req.session.loggedin) {
        //res.send('Metodo Get list');
        req.getConnection((err, conn) => {
            const {Variable} = req.params;
            conn.query("SELECT * FROM Encuesta WHERE Clave = '"+Variable+"'", (err, Componentes) => {
                if (err) {
                    console.log('Error de lectura');
                }
                console.table(Componentes);
                res.json(Componentes);
            });
        });
    } else {
        res.render('Login.html');
    }
};



Controller.NuevaImportacion = (req, res) => {
    if (req.session.loggedin) {
        req.getConnection((err, conn) => {
            const data = req.body; //TRAE TODO EL OBJETO
           
            var limite = Object.values(data).length;
            //console.log("Tamaño " + Object.values(data).length + " keys " +  Object.values(data)[0][1]  );
            for (var i = 0; i < limite; i++) {
 
                var Pedimento = Object.values(data)[i][0];
                var Origen = Object.values(data)[i][1];
                var Proveedor = Object.values(data)[i][2];
                var Factura = Object.values(data)[i][3];
                var Monto = Object.values(data)[i][4];
                var Cantidad = Object.values(data)[i][5];
                var OT = Object.values(data)[i][6];
                var OC = Object.values(data)[i][7];
                var Descripcion = Object.values(data)[i][8];
                var Diametro = Object.values(data)[i][9];
                var DiametroIn = Object.values(data)[i][10];
                var Largo = Object.values(data)[i][11];
                var LBS = Object.values(data)[i][12];
                var KG = Object.values(data)[i][13];
                var Colada = Object.values(data)[i][14];
                var Tarima = Object.values(data)[i][15];

                conn.query("INSERT INTO Importaciones(Pedimento,Origen,Proveedor,Factura,Monto,Cantidad,OT,OC,Descripcion,Diametro,DiametroIn,Largo,LBS,KG,Colada,Tarima)values('"+Pedimento + "','" + Origen + "','" + Proveedor + "','" + Factura + "','" + Monto +  "','"  + Cantidad + "','" + OT + "','" + OC + "','" + Descripcion + "','" + Diametro + "','" + DiametroIn + "','" + Largo + "','" + LBS + "','" + KG + "','" + Colada + "','" + Tarima +"')", [], (err, ot) => {
                    if (err) {
                        console.log('Error al registrar recepcion' + err);
                    } else {
                        console.log('Recepcion exitosa: ' + i);
                    }
                });
            }
        });
    } else {
        //res.render('Admin/Login.html');
    }
};




module.exports = Controller;