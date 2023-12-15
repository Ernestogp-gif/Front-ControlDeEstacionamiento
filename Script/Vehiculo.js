
function ListarVehiculo() {

    const tabla = document.getElementById('tableVehiculo');

    fetch('http://localhost:5133/Vehiculo/Listar')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data =>  llenarTablaVehiculo(tabla, JSON.stringify(data.response)))
        .catch(error => console.log(error));
}


function llenarTablaVehiculo(tabla, datos) {
    const tbody = tabla.querySelector('tbody');

    
    tbody.innerHTML = '';
    
    datos = JSON.parse(datos);
    
    datos.forEach(item => {        
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td class="action">
                <img src="../favicon/editar-20.png" onclick="EditarVeh(this)">
                <img src="../favicon/eliminar-20.png" onclick="EliminarVeh(this)">
            </td>
            <td data-column="Placa">${item.placa}</td>
            <td data-column="Modelo">${item.modelo}</td>
            <td data-column="Color">${item.color}</td>
            <td data-column="Marca">${item.marca}</td>
            <td data-column="DNI">${item.dni}</td>
            <td data-column="Nombre">${item.nombre}</td>
            <td data-column="Apellido">${item.apellido}</td>
        `;
        tbody.appendChild(fila);        
    });    
}


/************************************** Mostrar MODAL ***************************************** */

var modalVehiculo = document.getElementById('ModalVehiculo');
var BtnAbrirModalRegistrarVehiculo = document.getElementById('RegVehiculo');

BtnAbrirModalRegistrarVehiculo.addEventListener('click', function () {
    modalVehiculo.style.display = 'block';
    var btnGuardar = document.getElementById('BtnGuardaVehiculo');
    var btnEditar = document.getElementById('BtnEditaVehiculo');

    btnGuardar.style.display = 'block';
    btnEditar.style.display = 'none';

    var InputPlaca = document.getElementById('ModPlaca');
    InputPlaca.readOnly = false;
    var InputDniV = document.getElementById('ModDNIV');
    InputDniV.readOnly = false;

}); 


closeModalBtnVehiculo.addEventListener('click', function () {
    console.log("boton cerrar");
    ocultarModalVehiculo();
});


window.addEventListener('click', function (event) {    
    if (event.target === modalVehiculo) {
        ocultarModalVehiculo();
    }
});

/************************************** Guardar Cliente ***************************************** */

function GuardarVehiculo() {
    
    
    var DNI = document.getElementById('ModDNIV').value;
    var Placa = document.getElementById('ModPlaca').value;
    var Modelo = document.getElementById('ModModelo').value;
    var Color = document.getElementById('ModColor').value;
    var Marca = document.getElementById('ModMarca').value;


    fetch('http://localhost:5133/Vehiculo/Guardar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            DNI: DNI,
            Placa: Placa,
            Modelo: Modelo,
            Color: Color,
            Marca: Marca

        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
            ListarVehiculo()
            
        })
        .catch(error => console.error('Error:', error));

    ocultarModalVehiculo();
}

function ocultarModalVehiculo() {
    var DNI = document.getElementById('ModDNIV');
    var Placa = document.getElementById('ModPlaca');
    var Modelo = document.getElementById('ModModelo');
    var Color = document.getElementById('ModColor');
    var Marca = document.getElementById('ModMarca');

    DNI.value = '';
    Placa.value = '';
    Modelo.value = '';
    Color.value = '';
    Marca.value = '';

    var modal = document.getElementById('ModalVehiculo');
    modal.style.display = 'none';
}

/************************************** Eliminar registro ***************************************** */

function EliminarVeh(fila) {

    var confirmacion = confirm('¿Seguro que desea eliminar el registro?');

    if (confirmacion) {
        eliminarRegistroVehiculo(capturarFilaVehiculo(fila));
    } else {
        alert('Eliminación cancelada.');
    }
}


function capturarFilaVehiculo(fila) {
    // Obtener la fila actual
    var fila = fila.closest('tr');

    // Obtener los valores de las celdas de la fila
    var Placa = fila.cells[1].innerText;
    var Modelo = fila.cells[2].innerText;
    var Color = fila.cells[3].innerText;
    var Marca = fila.cells[4].innerText;
    var DNI = fila.cells[5].innerText;

    var cliente = JSON.stringify({
        Placa: Placa,
        Modelo: Modelo,
        Color: Color,
        Marca: Marca,
        DNI: DNI
    })

    return cliente;
}


function eliminarRegistroVehiculo(cliente) {

    fetch('http://localhost:5133/Vehiculo/Eliminar', {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: cliente
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => console.error('Error:', error));

    alert('Registro eliminado exitosamente.');
    ListarVehiculo();
}

/************************************** Editar registro ***************************************** */

function EditarVeh(fila) {

    modalVehiculo.style.display = 'block';
    var btnGuardar = document.getElementById('BtnGuardaVehiculo');
    var btnEditar = document.getElementById('BtnEditaVehiculo');

    btnGuardar.style.display = 'none';
    btnEditar.style.display = 'block';

    var DNI = document.getElementById('ModDNIV');
    var Placa = document.getElementById('ModPlaca');
    var Modelo = document.getElementById('ModModelo');
    var Color = document.getElementById('ModColor');
    var Marca = document.getElementById('ModMarca');

    var Vehiculo = JSON.parse(capturarFilaVehiculo(fila));

    DNI.value = Vehiculo.DNI;
    Placa.value = Vehiculo.Placa;
    Modelo.value = Vehiculo.Modelo;
    Color.value = Vehiculo.Color;
    Marca.value = Vehiculo.Marca;
    
    var InputPlaca = document.getElementById('ModPlaca');
    InputPlaca.readOnly = true;
    var InputDniV = document.getElementById('ModDNIV');
    InputDniV.readOnly = true;
    
}


function EditarVehiculo(cliente) {

    var Placa = document.getElementById('ModPlaca');
    var Modelo = document.getElementById('ModModelo');
    var Color = document.getElementById('ModColor');
    var Marca = document.getElementById('ModMarca');
    var DNI = document.getElementById('ModDNIV');

    var vehiculo =JSON.stringify({
        Placa: Placa.value,
        Modelo: Modelo.value,
        Color: Color.value,
        Marca: Marca.value,
        DNI: DNI.value
    });
    
    var confirmacion = confirm('¿Seguro que desea editar el registro?');
    console.log(cliente);
    if (confirmacion) {
        fetch('http://localhost:5133/Vehiculo/Editar', {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: vehiculo
        })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del servidor:', data);
    
            })
            .catch(error => console.error('Error:', error));
    
        alert('Registro editado exitosamente.');
        ListarVehiculo();
    } else {
        alert('Edición cancelada.');
    }
    ocultarModalVehiculo();
}

