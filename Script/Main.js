
document.addEventListener('DOMContentLoaded', function () {

    var OptCliente = [
        { value: 'DNI', text: 'DNI' },
        { value: 'Nombre', text: 'Nombre' },
        { value: 'Apellido', text: 'Apellido' },
        { value: 'Telefono', text: 'Telefono' }
        
    ];

    var select = document.getElementById('SelectFilCliente');


    OptCliente.forEach(function (opcion) {
        var option = document.createElement('option');
        option.value = opcion.value;
        option.text = opcion.text;
        select.appendChild(option);
    });

    var OptVehiculo = [
        { value: 'Placa', text: 'Placa' },
        { value: 'Modelo', text: 'Modelo' },
        { value: 'Color', text: 'Color' },
        { value: 'Marca', text: 'Marca' },
        { value: 'DNI', text: 'DNI' },
        { value: 'Nombre', text: 'Nombre' },
        { value: 'Apellido', text: 'Apellido' }
        
    ];

    var select = document.getElementById('SelectFilVehiculo');

    OptVehiculo.forEach(function (opcion) {
        var option = document.createElement('option');
        option.value = opcion.value;
        option.text = opcion.text;
        select.appendChild(option);
    });

    var OptPlaza = [
        { value: 'Codigo', text: 'Codigo' },
        { value: 'estado', text: 'estado' },
        { value: 'DNI', text: 'DNI' },
        { value: 'Nombre', text: 'Nombre' },
        { value: 'Apellido', text: 'Apellido' }
        
    ];

    var select = document.getElementById('SelectFilPlaza');

    OptPlaza.forEach(function (opcion) {
        var option = document.createElement('option');
        option.value = opcion.value;
        option.text = opcion.text;
        select.appendChild(option);
    });

    // usuario login
    const queryString = window.location.search;

    const params = new URLSearchParams(queryString);

    const usuario = params.get('usuario');

    const user = document.getElementById('asd');

    user.textContent = usuario;
});

//**************************************************************************************** */

function mostrarVista(vistaId) {
    
    var vistas = document.querySelectorAll('.main-content > div');
    for (var i = 0; i < vistas.length; i++) {
        vistas[i].classList.add('hidden');
    }
    
    var vistaSeleccionada = document.getElementById(vistaId);
    vistaSeleccionada.classList.remove('hidden');
    if (vistaId == "vista1") {
        ListarCliente();
    }
    if (vistaId == "vista2") {
        ListarVehiculo();
    }
    if (vistaId == "vista3") {
        ListarPlaza();
    }
}

//**************************************************************************************** */

function filtrarTabla(vista) {

    var SelectFiltro = '';
    var DatoFiltro = '';
    var table = '';

    if (vista == 'Cliente') { SelectFiltro = 'SelectFilCliente'; DatoFiltro = 'DatoFilCliente'; table = 'tablecliente'; }
    if (vista == 'Vehiculo') { SelectFiltro = 'SelectFilVehiculo'; DatoFiltro = 'DatoFilVehiculo'; table = 'tableVehiculo'; }
    if (vista == 'Plaza') { SelectFiltro = 'SelectFilPlaza'; DatoFiltro = 'DatoFilPlaza'; table = 'tablePlaza'; }

    var columnaNombre = document.getElementById(SelectFiltro).value;
    var valorFiltro = document.getElementById(DatoFiltro).value.toUpperCase();
    
    var tabla = document.getElementById(table);
    var filas = tabla.getElementsByTagName('tr');


    for (var i = 1; i < filas.length; i++) {
        var celda = filas[i].querySelector('td[data-column="' + columnaNombre + '"]');
        //console.log(celda);
        if (celda) {
            var textoCelda = celda.textContent || celda.innerText;
            if (textoCelda.toUpperCase().indexOf(valorFiltro) > -1) {
                filas[i].style.display = '';
            } else {
                filas[i].style.display = 'none';
            }
        }
    }
}

function limpiarFiltro(vista) {

    var SelectFiltro = '';
    var DatoFiltro = '';
    var table = '';

    if (vista == 'Cliente') { SelectFiltro = 'SelectFilCliente'; DatoFiltro = 'DatoFilCliente'; table = 'tablecliente'; }
    if (vista == 'Vehiculo') { SelectFiltro = 'SelectFilVehiculo'; DatoFiltro = 'DatoFilVehiculo'; table = 'tableVehiculo'; }
    if (vista == 'Plaza') { SelectFiltro = 'SelectFilPlaza'; DatoFiltro = 'DatoFilPlaza'; table = 'tablePlaza'; }

    var tabla = document.getElementById(table);
    var filas = tabla.getElementsByTagName('tr');

    for (var i = 1; i < filas.length; i++) {
        filas[i].style.display = '';
    }

    document.getElementById(SelectFiltro).value = '';
    document.getElementById(DatoFiltro).value = '';
}

//**************************************************************************************** */

