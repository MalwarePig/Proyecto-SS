//Nueva Encuesta
function modal() {
    $("#ModalImportaciones").modal();
}

//=========================================== Guardar elementos de la nota =================================================//
function GuardarNota() {
    var Pedimento = document.getElementById("Pedimento").value;
    var Origen = document.getElementById("Origen").value;
    var Proveedor = document.getElementById("Proveedor").value;
    var Factura = document.getElementById("Factura").value;
    var Monto = document.getElementById("Monto").value;
    var Cantidad = document.getElementById("Cantidad").value;
    var OT = document.getElementById("OT").value;
    var OC = document.getElementById("OC").value;
    var Descripcion = document.getElementById("Descripcion").value;
    var Diametro = document.getElementById("Diam").value;
    var DiametroIn = document.getElementById("DiamIn").value;
    var Largo = document.getElementById("Largo").value;
    var LBS = document.getElementById("LBS").value;
    var KG = document.getElementById("KG").value;
    var Colada = document.getElementById("Colada").value;
    var Tarima = document.getElementById("Tarima").value;

    var Tabla = [Pedimento, Origen, Proveedor, Factura, Monto, Cantidad, OT, OC, Descripcion, Diametro, DiametroIn, Largo, LBS, KG, Colada, Tarima]
    console.table(Tabla);
    $.post("/NuevaImportacion", // url
        {
            Tabla
        }, // data to be submit
        function (objeto, estatus) { // success callback
            //console.log("objeto: " + objeto + "Estatus: " + estatus);
        });
}

function Fecha(parametro) {
    var Fecha = new Date(parametro);
    var dd = Fecha.getDate();
    var mm = Fecha.getMonth() + 1;
    var yyyy = Fecha.getFullYear();
    var HH = Fecha.getHours();
    var mi = Fecha.getMinutes();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = dd + '/' + mm + '/' + yyyy;
    return today;
}

localStorage.removeItem('Contador'); // Elimina el elemento de memoria 
localStorage.setItem('Contador', 0);

function NuevaPregunta() {

    let Total = parseInt(localStorage.getItem('Contador'));
    Total = Total + 1;
    localStorage.removeItem('Contador'); // Elimina el elemento de memoria 
    localStorage.setItem('Contador', Total);

    //Obtner Modelo del div de pregunta
    var tarjeta = document.getElementById("cardPrincial").innerHTML;

    //Crear el div
    const div = document.getElementById('Pregunta'); //Creo un nuevo div para la nueva tarjeta
    div.id = "Kit" + Total;
    div.innerHTML = tarjeta;

    const Descripcion = document.getElementsByName('Descripcion'); //se renombra el id de la parte colapsador
    Descripcion.id = 'Descripcion' + Total;

    const Nuevo = document.getElementById('Nuevo'); //se renombra el id de la parte colapsador
    Nuevo.id = 'Pregunta';
 
}