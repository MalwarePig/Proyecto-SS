//CONSULTAR HERRAMIENTAS -- BOTON BUSCAR    
function ObtenerUsuarios() {

    $.ajax({
        url: '/ObtenerUsuarios/',
        success: function (Usuarios) {
            var Arreglo = [];
            //Limpiar tabla 
            var TablaRegistros = document.getElementById('UsRegistros').getElementsByTagName('tbody')[0];
            var limite = TablaRegistros.rows.length;
            for (var i = 0; i < limite; i++) {
                $("#Rows").remove(); //elimina los elementos con id Rows
            }
            if (Usuarios.length == 0) {
                $("#Vacio").modal();
            }
            for (var i = 0; i < Usuarios.length; i++) {
                var id = Usuarios[i].idUsuarios;
                var Usuario = Usuarios[i].Usuario;
                var Contrasena = Usuarios[i].Contrasena;
                var Nombre = Usuarios[i].Nombre + " " + Usuarios[i].ApellidoP + " " + Usuarios[i].ApellidoM;
                var Tipo = Usuarios[i].Tipo;
                var Estatus = Usuarios[i].Estatus;
                //Eliminar variable dentro del For
                Arreglo = [id, Usuario, Contrasena, Nombre, Tipo,Estatus]
 
                // inserta una fila al final de la tabla
                var newRow = TablaRegistros.insertRow(TablaRegistros.rows.length);
                for (var x = 0; x < Arreglo.length; x++) {
                    // inserta una celda en el indice 0
                    var newCell = newRow.insertCell(x);
                    newRow.setAttribute("id", "Rows"); //se asigna id al incrementar cada fila +1 para contar el encabezado
                    // adjuntar el texto al nodo
                    var newText = document.createTextNode(Arreglo[x]);
                    newCell.appendChild(newText);

                    if (x == 5) { //Si termina de registrar datos crear el boton
                        var newCell = newRow.insertCell(6); //CREAR CELDA
                        newCell.innerHTML = '<button id="' + i + '" class="btn btn-dark" name="btn" onclick=Seleccion(' + (i + 1) + ')> Selección </button>';
                    }
                } //fin de for de columnas
            } //fin de for de filas
        } //Funcion success
    }); //Ajax
} //Evento clic