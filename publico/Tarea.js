const inputTarea = document.getElementById("nuevaTarea");
const btnAgregar = document.getElementById("btnAgregar");
const lista = document.getElementById("listaTareas");
const listaRealizadas = document.getElementById("tareasRealizadas");
const btnEliminar = document.getElementById("btnEliminar");

let tareasGuardadas = [];

// cargar tareas al abrir la página
window.onload = cargarTareas;

function cargarTareas(){

    fetch("/tareas")
    .then(res => res.json())
    .then(data => {

        lista.innerHTML = "";
        listaRealizadas.innerHTML = "";
        tareasGuardadas = [];

        data.forEach(tarea => {

            tareasGuardadas.push(tarea.Taname);

            const li = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            const texto = document.createElement("span");
            texto.textContent = tarea.Taname;

            checkbox.addEventListener("change", () => {

                if(checkbox.checked){
                    listaRealizadas.appendChild(li);
                }else{
                    lista.appendChild(li);
                }

            });

            li.appendChild(checkbox);
            li.appendChild(texto);

            if(tarea.realizado){
                listaRealizadas.appendChild(li);
            }else{
                lista.appendChild(li);
            }

        });

    });

}

// agregar tarea
btnAgregar.addEventListener("click", () => {

    const tarea = inputTarea.value.trim();

    // alerta si está vacía
    if(tarea === ""){
        alert("La caja de texto está vacía");
        return;
    }

    // alerta si ya existe
    if(tareasGuardadas.includes(tarea)){
        alert("La tarea ya existe");
        return;
    }

    fetch("/agregarTarea", {

        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify({
            tarea: tarea
        })

    })
    .then(res => res.json())
    .then(data => {

        if(data.agregado){

            inputTarea.value = "";
            cargarTareas();

        }else{

            alert("No se pudo agregar la tarea");

        }

    });

});


// eliminar tareas seleccionadas
btnEliminar.addEventListener("click", () => {

    const checkboxes = document.querySelectorAll("#listaTareas input[type='checkbox']:checked");

    if(checkboxes.length === 0){
        alert("Seleccione una tarea para eliminar");
        return;
    }

    checkboxes.forEach(c => {

        const tarea = c.nextSibling.textContent;

        fetch("/eliminarTarea", {

            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify({
                tarea: tarea
            })

        })
        .then(res => res.json())
        .then(data => {

            if(data.eliminado){
                cargarTareas();
            }else{
                alert("No se pudo eliminar la tarea");
            }

        });

    });

});