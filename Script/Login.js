function Enviar() {

    var user = document.getElementById("username").value;
    var clav = document.getElementById("clave").value;

    const datos = {
        NombreUsuario: user,
        Clave: clav
    };

    const endpoint = "http://localhost:5133/Login/Autenticar";

    fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
    })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            if (data == 1) {
                
                const rutaHTML = './Views/Main.html';
                
                const parametro = 'usuario=' + user;

                const urlConParametro = `${rutaHTML}?${parametro}`;

                window.location.href = urlConParametro;
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
}

