
function ListarCliente() {

    const tabla = document.getElementById('tablecliente');

    fetch('http://localhost:5133/Cliente/Listar')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => llenarTablaCliente(tabla, JSON.stringify(data.response)))
        .catch(error => console.log(error));
}


function llenarTablaCliente(tabla, datos) {
    const tbody = tabla.querySelector('tbody');

    
    tbody.innerHTML = '';
    //var datos = JSON.parse(datos1);   

    datos = JSON.parse(datos);

    datos.forEach(item => {

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td class="action">
                <img src="../favicon/editar-20.png" onclick="EditarCli(this)">
                <img src="../favicon/eliminar-20.png" onclick="EliminarCli(this)">
            </td>
            <td data-column="DNI"">${item.dni}</td>
            <td data-column="Nombre">${item.nombre}</td>
            <td data-column="Apellido">${item.apellido}</td>
            <td data-column="Telefono">${item.telefono}</td>
        `;
        tbody.appendChild(fila);
    });
}

/************************************** Mostrar MODAL ***************************************** */

var modalCliente = document.getElementById('ModalCliente');
var BtnAbrirModalRegistrarCliente = document.getElementById('RegCliente');

BtnAbrirModalRegistrarCliente.addEventListener('click', function () {

    modalCliente.style.display = 'block';
    var btnGuardar = document.getElementById('BtnGuardaCliente');
    var btnEditar = document.getElementById('BtnEditaCliente');

    btnGuardar.style.display = 'block';
    btnEditar.style.display = 'none';

    var InputDNI = document.getElementById('ModDNI');
    InputDNI.readOnly = false;

});

// Cerrar el modal al hacer clic en el botón de cerrar
closeModalBtnCliente.addEventListener('click', function () {
    ocultarModalCliente();
});

window.addEventListener('click', function (event) {
    if (event.target === modalCliente) {
        ocultarModalCliente();
    }
});

/************************************** Guardar Cliente ***************************************** */

function GuardarCliente() {
    
    // Obtener datos del formulario
    var DNI = document.getElementById('ModDNI').value;
    var Nombre = document.getElementById('ModNombre').value;
    var Apellido = document.getElementById('ModApellido').value;
    var Telefono = document.getElementById('ModTelefono').value;


    fetch('http://localhost:5133/Cliente/Guardar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            DNI: DNI,
            Nombre: Nombre,
            Apellido: Apellido,
            Telefono: Telefono

        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
            ListarCliente()
            
        })
        .catch(error => console.error('Error:', error));

    ocultarModalCliente();
}

function ocultarModalCliente() {
    var DNI = document.getElementById('ModDNI');
    var Nombre = document.getElementById('ModNombre');
    var Apellido = document.getElementById('ModApellido');
    var Telefono = document.getElementById('ModTelefono');

    DNI.value = ''; 
    Nombre.value = '';
    Apellido.value = '';
    Telefono.value = '';

    var modal = document.getElementById('ModalCliente');
    modal.style.display = 'none';
}

/************************************** Eliminar registro ***************************************** */

function EliminarCli(fila) {

    var confirmacion = confirm('¿Seguro que desea eliminar el registro?');

    if (confirmacion) {
        eliminarRegistroCliente(capturarFilaCliente(fila));
    } else {
        alert('Eliminación cancelada.');
    }
}


function capturarFilaCliente(fila) {
    // Obtener la fila actual
    var fila = fila.closest('tr');

    var dni = fila.cells[1].innerText;
    var nombre = fila.cells[2].innerText;
    var apellido = fila.cells[3].innerText;
    var telefono = fila.cells[4].innerText;

    var cliente = JSON.stringify({
        DNI: dni,
        Nombre: nombre,
        Apellido: apellido,
        Telefono: telefono
    })

    return cliente;
}


function eliminarRegistroCliente(cliente) {

    fetch('http://localhost:5133/Cliente/Eliminar', {
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
    ListarCliente();
    

}

/************************************** Editar registro ***************************************** */

function EditarCli(fila) {

    modalCliente.style.display = 'block';
    var btnGuardar = document.getElementById('BtnGuardaCliente');
    var btnEditar = document.getElementById('BtnEditaCliente');

    btnGuardar.style.display = 'none';
    btnEditar.style.display = 'block';

    var DNI = document.getElementById('ModDNI');
    var Nombre = document.getElementById('ModNombre');
    var Apellido = document.getElementById('ModApellido');
    var Telefono = document.getElementById('ModTelefono');

    var cliente = JSON.parse(capturarFilaCliente(fila));
    DNI.value = cliente.DNI;
    Nombre.value = cliente.Nombre;
    Apellido.value = cliente.Apellido;
    Telefono.value = cliente.Telefono;
    
    var InputDNI = document.getElementById('ModDNI');
    InputDNI.readOnly = true;    
}


function EditarCliente(cliente) {

    var DNI = document.getElementById('ModDNI');
    var Nombre = document.getElementById('ModNombre');
    var Apellido = document.getElementById('ModApellido');
    var Telefono = document.getElementById('ModTelefono');

    var cliente =JSON.stringify({
        DNI: DNI.value,
        Nombre: Nombre.value,
        Apellido: Apellido.value,
        Telefono: Telefono.value
    });
    
    var confirmacion = confirm('¿Seguro que desea editar el registro?');
    console.log(cliente);
    if (confirmacion) {
        fetch('http://localhost:5133/Cliente/Editar', {
            method: 'Put',
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
    
        alert('Registro editado exitosamente.');
        ListarCliente();
    } else {
        alert('Edición cancelada.');
    }
    ocultarModalCliente();
}

