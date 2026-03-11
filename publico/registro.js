// Función que se ejecuta al presionar el botón "registrarme"
function registro(){

    // Obtener los valores de los inputs
    const Usname = document.getElementById("usname").value;
    const Correo = document.getElementById("Correo").value;
    const Pin = document.getElementById("pin").value;

    // Enviar datos al servidor
    fetch("/registro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Usname: Usname,
            correo: Correo,
            pin: Pin
        })
    })

    .then(res => res.json())
    .then(data => {

        if(data.registrado){
            document.getElementById("respuesta").innerText = "Usuario registrado correctamente";
        }
        else{
            document.getElementById("respuesta").innerText = "Error al registrar usuario";
        }

    });

}