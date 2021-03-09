function ListaEncuestas(){
    var temp = document.getElementById("accordion").childNodes.length;
    if (temp == 0) {
        $.ajax({
            url: '/ListaEncuestas/',
            success: function (Encuestas) {
                var TotalKits = Encuestas.length;
                for (var i = 0; i < TotalKits; i++) {
                    MostrarKits(i);//Renombrar componentres con un id
                    document.getElementById('Clave' + i).value = Encuestas[i].Clave;
                    document.getElementById('Autor' + i).value = Encuestas[i].Autor;
                    document.getElementById('Estatus' + i).value = Encuestas[i].Estatus;
                    document.getElementById('Descripcion' + i).value = Encuestas[i].Descripcion;
                    document.getElementById('Fecha' + i).value = Encuestas[i].FechaCreacion;
                } //fin de for de filas
            } //Funcion success
        }); //Ajax
    }
}

function Evento(indiceDiv) {
    var temp = document.getElementById('AccordionSub' + indiceDiv).childNodes.length; //Si ya tiene nodos hijos
    if (temp == 0) {
        $.ajax({
            url: '/DesplegarPregunta/'+document.getElementById("Clave" + indiceDiv).value,
            success: function (Componentes) {
                var TotalComponentes = Componentes.length;
                for (var i = 0; i < TotalComponentes; i++) {
                    MostrarSub(indiceDiv, i); //Construir una subTarjeta

                    document.getElementById('S_Clave' + indiceDiv + i).value = Componentes[i].Clave;
                    document.getElementById('S_Pregunta' + indiceDiv + i).value = Componentes[i].Descripcion;
 
                } //fin de for de filas
            } //Funcion success
        }); //Ajax
        //alert( document.getElementById("Parte"+vars).value);
    }
}


function MostrarKits(i) {
    //var tarjeta = document.getElementById("card");
    var tarjeta = document.getElementById("cardPrincial").innerHTML;
    //document.getElementById("accordion").innerHTML = tarjeta;

    //Crear el div
    const div = document.createElement("div"); //Creo un nuevo div para la nueva tarjeta
    div.id = "Kit" + i;
    div.innerHTML = tarjeta;
    document.getElementById("accordion").appendChild(div); //Incrusta el nuevo div en el apartado de subAcordion

    var btn = document.getElementById('BtnPrincipal'); //Se extrae el boton de la tarjeta
    //Se le asigna las propiedades para el colapso
    //document.getElementById('BtnPrincipal').setAttribute('class', 'btn btn-link collapsed');
    document.getElementById('BtnPrincipal').setAttribute('data-target', '#collapsePrincipal' + i);
    document.getElementById('BtnPrincipal').setAttribute('data-toggle', 'collapse');
    document.getElementById('BtnPrincipal').setAttribute('aria-expanded', 'false');
    document.getElementById('BtnPrincipal').setAttribute('aria-controls', 'collapseTwo');
    document.getElementById('BtnPrincipal').setAttribute('name', i);
    document.getElementById('BtnPrincipal').setAttribute('onclick', 'Evento(' + i + ')');
    btn.id = "BtnPrincipal" + i; //Se renombra el boton

    const colapsador = document.getElementById('collapsePrincipal'); //se renombra el id de la parte colapsador
    colapsador.id = 'collapsePrincipal' + i;

    //Crear el div
    const AccordionSub = document.getElementById('AccordionSub'); //se renombra el id de la parte colapsador
    AccordionSub.id = "AccordionSub" + i;

    const Clave = document.getElementById('Clave'); //se renombra el id de la parte colapsador
    Clave.id = 'Clave' + i;

    const Autor = document.getElementById('Autor'); //se renombra el id de la parte colapsador
    Autor.id = 'Autor' + i;

    const Estatus = document.getElementById('Estatus'); //se renombra el id de la parte colapsador
    Estatus.id = 'Estatus' + i;

    const Descripcion = document.getElementById('Descripcion'); //se renombra el id de la parte colapsador
    Descripcion.id = 'Descripcion' + i;

    const Fecha = document.getElementById('Fecha'); //se renombra el id de la parte colapsador
    Fecha.id = 'Fecha' + i;

    const Cancelar = document.getElementById('Cancelar'); //se renombra el id de la parte colapsador
    Cancelar.id = 'Cancelar' + i;
 

    //Contar los hijos
    //var temp = document.getElementById("BtnPrincipal"+i).childNodes.length;
    //alert("Total: " + temp  );
}

function MostrarSub(indice, Fila) {

    //Obten datos
    var tarjeta = document.getElementById("cardSub").innerHTML; //Creo la subtarjeta en un objeto
    var Acordeon = document.getElementById('AccordionSub' + indice);
    //Crear el div
    const div = document.createElement("div"); //Creo un nuevo div para la nueva tarjeta
    div.id = "Sub" + indice;
    div.innerHTML = tarjeta;
    document.getElementById("AccordionSub" + indice).appendChild(div); //Incrusta el nuevo div en el apartado de subAcordion

    var btn = document.getElementById('Btn'); //Se extrae el boton de la tarjeta
    //Se le asigna las propiedades para el colapso
    document.getElementById('Btn').setAttribute('class', 'btn btn-link collapsed');
    document.getElementById('Btn').setAttribute('data-target', '#collapseThree' + Fila);
    document.getElementById('Btn').setAttribute('data-toggle', 'collapse');
    document.getElementById('Btn').setAttribute('aria-expanded', 'false');
    document.getElementById('Btn').setAttribute('aria-controls', 'collapseTwo');
    //document.getElementById('Btn').setAttribute('onclick', 'CargarTabla(' + indice + ',' + Fila + ')');
    btn.id = "Btn" + indice; //Se renombra el boton

    const Clave = document.getElementById('S_Clave'); //se renombra el id de la parte colapsador
    Clave.id = 'S_Clave' + indice + Fila;

    const Pregunta = document.getElementById('S_Pregunta'); //se renombra el id de la parte colapsador
    Pregunta.id = 'S_Pregunta' + indice + Fila;

    const Editar = document.getElementById('S_Editar'); //se renombra el id de la parte colapsador
    Editar.id = 'S_Editar' + indice + Fila;
 
    //Contar los hijos
    //var temp = document.getElementById("accordion").childNodes.length;
    //console.log("Total: " + temp);
}



function CargarTabla(indiceDiv, indiceTabla) {

    $.ajax({
        url: '/BuscarSubComponentes/' + document.getElementById("S_Parte" + indiceDiv + indiceTabla).value,
        success: function (Componentes) {
            var TotalComponentes = Componentes.length;
            var Arreglo = [];
            //Limpiar tabla 
            var TablaKits = document.getElementById('OTRegistros'+indiceTabla).getElementsByTagName('tbody')[0];
            var limite = TablaKits.rows.length;
            for (var i = 0; i < limite; i++) {
                $("#Rows"+indiceDiv+indiceTabla+i).remove(); //elimina los elementos con id Rows
            }
            for (var i = 0; i < TotalComponentes; i++) {
                var Reqs = Componentes[i].Reqs;
                var Cantidad = Componentes[i].Cantidad;
                var Estatus = Componentes[i].Estatus;
                //Eliminar variable dentro del For
                Arreglo = [Reqs, Cantidad, Estatus]
 
                // inserta una fila al final de la tabla
                var newRow = TablaKits.insertRow(TablaKits.rows.length);
                for (var x = 0; x < Arreglo.length; x++) {
                    // inserta una celda en el indice 0
                    var newCell = newRow.insertCell(x);
                    newRow.setAttribute("id", "Rows"+indiceDiv+indiceTabla+i); //se asigna id al incrementar cada fila +1 para contar el encabezado
                    // adjuntar el texto al nodo
                    var newText = document.createTextNode(Arreglo[x]);
                    newCell.appendChild(newText);

                    if (x == 4) { //Si termina de registrar datos crear el boton
                        var newCell = newRow.insertCell(5); //CREAR CELDA
                        newCell.innerHTML = '<button id="' + i + '" class="btn btn-dark" name="btn" onclick=Seleccion(' + (i + 1) + ')> Selección </button>';
                    }
                } //fin de for de columnas
            } //fin de for de filas
        } //Funcion success
    }); //Ajax
    //alert( document.getElementById("Parte"+vars).value);
}



 