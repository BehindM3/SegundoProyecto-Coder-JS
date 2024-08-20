const empleadoSeleccionado = JSON.parse(localStorage.getItem("empleadoSeleccionado"));
const fechaActual = new Date();
const HorariosEmpleado = [];

//Cargamos valores default para facilitar el trabajo al empleado 
document.getElementById("cargaNombreEmpleado").value = empleadoSeleccionado.usuario;
document.getElementById("cargaFechaEmpleado").value = fechaActual.toISOString().split('T')[0];
document.getElementById("cargaAreaEmpleado").value = empleadoSeleccionado.area;

//Muestra de historial
function crearHistorial(){
    
    let sectionHistorial = document.getElementById("historialHorario");
    let article = document.createElement("article");
    const historialEmpleadoSeleccionado = JSON.parse(localStorage.getItem(empleadoSeleccionado.usuario));
    
    sectionHistorial.innerHTML = "";

    historialEmpleadoSeleccionado.forEach( horario => {
        const divHistorial = document.createElement("div");

        divHistorial.className = `historialDeHorarios`;    
        divHistorial.innerHTML = `
            <div>${empleadoSeleccionado.usuario}</div>
            <div>${horario.area}</div>
            <div>${horario.fecha}</div>
            <div>${horario.entrada}</div>
            <div>${horario.salida}</div>
        `;

        article.appendChild(divHistorial);
    });

    sectionHistorial.append(article);
}

//Agregar historial al JSON
async function agregarJSON(nuevoHorario){


    const datosParaEnviar = JSON.stringify(nuevoHorario);

    const postEspecificaciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'aplication/json'
        },
        body: datosParaEnviar
    };

    const respuestaHistorial = await fetch('../json/historial.json', postEspecificaciones);
    const historial = await respuestaHistorial.json();

    console.log(respuestaHistorial);
    console.log(historial);
    
    
}


//Creacion y agregado de nuevo horarios 
function nuevoHorarioEnLocalStorage(nombre, fecha, entrada, salida, area){
    
    const nuevoHorarioObjeto = {
        fecha, 
        entrada, 
        salida, 
        area
    };

    agregarJSON(nuevoHorarioObjeto)
    .then(datos => datos)

    HorariosEmpleado.unshift(nuevoHorarioObjeto);

    localStorage.setItem(nombre, JSON.stringify(HorariosEmpleado));
}


//Botones Enviar y Reset de historial 
document.getElementById("submitCargarHorario").addEventListener("click", (event) => {
    
    event.preventDefault();

    let nombreEmpleadoCargaHorario = document.getElementById("cargaNombreEmpleado").value;
    let fechaCargaHorario = document.getElementById("cargaFechaEmpleado").value;
    let entradaCargaHorario = document.getElementById("cargaHoraEntradaEmpleado").value;
    let salidaCargaHorario = document.getElementById("cargaHoraSalidaEmpleado").value;
    let areaTrabajoCargaHorario = document.getElementById("cargaAreaEmpleado").value;
    let denegacion = document.querySelector(".msjCredencialesDenegadas");

    if( entradaCargaHorario >= salidaCargaHorario ){
        denegacion.style.display = "block"
    }else{
        denegacion.style.display = "none"
        nuevoHorarioEnLocalStorage(nombreEmpleadoCargaHorario, fechaCargaHorario, entradaCargaHorario, salidaCargaHorario, areaTrabajoCargaHorario);
        crearHistorial();
    }

});

document.getElementById("resetCargarHorario").addEventListener("click", function(event) {

    event.preventDefault();

    document.getElementById("cargaNombreEmpleado").value = empleadoSeleccionado.usuario;
    document.getElementById("cargaFechaEmpleado").value = fechaActual.toISOString().split('T')[0];
    document.getElementById("cargaAreaEmpleado").value = empleadoSeleccionado.area;

    document.getElementById("cargaHoraEntradaEmpleado").value = "";
    document.getElementById("cargaHoraSalidaEmpleado").value = "";
});
 