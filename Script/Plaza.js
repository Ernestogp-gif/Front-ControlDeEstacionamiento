
function ListarPlaza() {

    const tabla = document.getElementById('tablePlaza');

    fetch('http://localhost:5133/Plaza/Listar')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data =>  llenarTablaPlaza(tabla, JSON.stringify(data.response)))
        .catch(error => console.log(error));
}


function llenarTablaPlaza(tabla, datos) {
    const tbody = tabla.querySelector('tbody');
    
    tbody.innerHTML = '';
    
    datos = JSON.parse(datos);

    datos.forEach(item => {
        
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td class="action">
                <img src="../favicon/editar-20.png" onclick="EditarPla(this)">
                <img src="../favicon/eliminar-20.png" onclick="EliminarPla(this)">
            </td>
            <td data-column="Codigo">${item.codPlaza}</td>
            <td data-column="estado">${item.estado}</td>
            <td data-column="DNI">${item.dni}</td>
            <td data-column="Nombre">${item.nombre}</td>
            <td data-column="Apellido">${item.apellido}</td>
        `;
        tbody.appendChild(fila);        
    });    
}

/************************************** Mostrar MODAL ***************************************** */

var modalPlaza = document.getElementById('ModalPlaza');
var BtnAbrirModalRegistrarPlaza = document.getElementById('RegPlaza');

BtnAbrirModalRegistrarPlaza.addEventListener('click', function () {

    modalPlaza.style.display = 'block';
    var btnGuardar = document.getElementById('BtnGuardaPlaza');
    var btnEditar = document.getElementById('BtnEditaPlaza');

    btnGuardar.style.display = 'block';
    btnEditar.style.display = 'none';

    var InputCodPlaza = document.getElementById('ModCodPlaza');
    InputCodPlaza.readOnly = false;

});


closeModalBtnPlaza.addEventListener('click', function () {
    ocultarModalPlaza();
});

window.addEventListener('click', function (event) {
    if (event.target === modalPlaza) {
        ocultarModalPlaza();
    }
});


/************************************** Guardar Plaza ***************************************** */

function GuardarPlaza() {
    
    
    var CodPlaza = document.getElementById('ModCodPlaza').value;
    var estado = document.getElementById('Modestado').value;
    var DNI = document.getElementById('ModDNIP').value;
    var Nombre = document.getElementById('ModNombreP').value;
    var Apellido = document.getElementById('ModApellidoP').value;


    fetch('http://localhost:5133/Plaza/Guardar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            CodPlaza: CodPlaza,
            estado: estado,
            DNI: DNI,
            Nombre: Nombre,
            Apellido: Apellido

        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
            ListarPlaza()
            
        })
        .catch(error => console.error('Error:', error));

    ocultarModalPlaza();
}

function ocultarModalPlaza() {
    var CodPlaza = document.getElementById('ModCodPlaza');
    var estado = document.getElementById('Modestado');
    var DNI = document.getElementById('ModDNIP');
    var Nombre = document.getElementById('ModNombreP');
    var Apellido = document.getElementById('ModApellidoP');

    CodPlaza.value = '';
    estado.value = '';
    DNI.value = '';
    Nombre.value = '';
    Apellido.value = '';

    var modal = document.getElementById('ModalPlaza');
    modal.style.display = 'none';
}

/************************************** Eliminar Plaza ***************************************** */

function EliminarPla(fila) {

    var confirmacion = confirm('¿Seguro que desea eliminar el registro?');

    if (confirmacion) {
        eliminarRegistroPlaza(capturarFilaPlaza(fila));
    } else {
        alert('Eliminación cancelada.');
    }
}


function capturarFilaPlaza(fila) {
    
    var fila = fila.closest('tr');
    
    var CodPlaza = fila.cells[1].innerText;
    var estado = fila.cells[2].innerText;
    var DNI = fila.cells[3].innerText;
    var Nombre = fila.cells[4].innerText;
    var Apellido = fila.cells[5].innerText;

    var plaza = JSON.stringify({
        CodPlaza: CodPlaza,
        estado: estado,
        DNI: DNI,
        Nombre: Nombre,
        Apellido: Apellido
    })

    return plaza;
}


function eliminarRegistroPlaza(plaza) {

    fetch('http://localhost:5133/Plaza/Eliminar', {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: plaza
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);

        })
        .catch(error => console.error('Error:', error));

    alert('Registro eliminado exitosamente.');
    ListarPlaza();   

}

/************************************** Editar Plaza ***************************************** */

function EditarPla(fila) {

    modalPlaza.style.display = 'block';
    var btnGuardar = document.getElementById('BtnGuardaPlaza');
    var btnEditar = document.getElementById('BtnEditaPlaza');

    btnGuardar.style.display = 'none';
    btnEditar.style.display = 'block';

    var CodPlaza = document.getElementById('ModCodPlaza');
    var estado = document.getElementById('Modestado');
    var DNI = document.getElementById('ModDNIP');
    var Nombre = document.getElementById('ModNombreP');
    var Apellido = document.getElementById('ModApellidoP');

    var plaza = JSON.parse(capturarFilaPlaza(fila));

    CodPlaza.value = plaza.CodPlaza;
    estado.value = plaza.estado;
    DNI.value = plaza.DNI;
    Nombre.value = plaza.Nombre;
    Apellido.value = plaza.Apellido;
    
    var InputCodPlaza = document.getElementById('ModCodPlaza');
    InputCodPlaza.readOnly = true;
}


function EditarPlaza(plaza) {

    var CodPlaza = document.getElementById('ModCodPlaza');
    var estado = document.getElementById('Modestado');
    var DNI = document.getElementById('ModDNIP');
    var Nombre = document.getElementById('ModNombreP');
    var Apellido = document.getElementById('ModApellidoP');

    var plaza =JSON.stringify({
        CodPlaza: CodPlaza.value,
        estado: estado.value,
        DNI: DNI.value,
        Nombre: Nombre.value,
        Apellido: Apellido.value
    })
    
    var confirmacion = confirm('¿Seguro que desea editar el registro?');
    
    if (confirmacion) {
        fetch('http://localhost:5133/Plaza/Editar', {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: plaza
        })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del servidor:', data);
    
            })
            .catch(error => console.error('Error:', error));
    
        alert('Registro editado exitosamente.');
        ListarPlaza();
    } else {
        alert('Edición cancelada.');
    }
    ocultarModalPlaza();
}

