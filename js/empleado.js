//Empleados 
let empleadoSeleccionado = localStorage.getItem("empleadoSeleccionado");
let areaempleadoSeleccionado = localStorage.getItem(empleadoSeleccionado);
const HorariosEmpleado = [];


document.getElementById("cargaNombreEmpleado").value = empleadoSeleccionado;
document.getElementById("cargaAreaEmpleado").value = areaempleadoSeleccionado;

function mostrarHistorial(){
    
    let sectionHistorial = document.getElementById("historialHorario");
    let article = document.createElement("article");

    sectionHistorial.innerHTML = "";

    HorariosEmpleado.forEach(horario => {
        const divHistorial = document.createElement("div");
        divHistorial.textContent = `${horario.nuevoHorarioObjeto.fecha} ${horario.nuevoHorarioObjeto.entrada} ${horario.nuevoHorarioObjeto.salida} - ${horario.nombre} `;
        divHistorial.className = "HistorialDeHorarios";
        article.appendChild(divHistorial);
    });

    sectionHistorial.append(article);
}

function agregarNuevoHorario(nombre, fecha, entrada, salida, area){

    const nuevoHorarioObjeto = {
        fecha, entrada, salida, area
    };
    console.log(nuevoHorarioObjeto);
    
    const nuevoHorario = {
        nombre, nuevoHorarioObjeto
    };

    localStorage.setItem(nombre, nuevoHorario);

    HorariosEmpleado.unshift(nuevoHorario);
    console.log(HorariosEmpleado);
    
    mostrarHistorial();
}

document.getElementById("submitCargarHorario").addEventListener("click", () => {
    
    event.preventDefault();

    let nombreEmpleadoCargaHorario = document.getElementById("cargaNombreEmpleado").value;
    let fechaCargaHorario = document.getElementById("cargaFechaEmpleado").value;
    let entradaCargaHorario = document.getElementById("cargaHoraEntradaEmpleado").value;
    let salidaCargaHorario = document.getElementById("cargaHoraSalidaEmpleado").value;
    let areaTrabajoCargaHorario = document.getElementById("cargaAreaEmpleado").value;

    agregarNuevoHorario(nombreEmpleadoCargaHorario, fechaCargaHorario, entradaCargaHorario, salidaCargaHorario, areaTrabajoCargaHorario);
});

document.getElementById("resetCargarHorario").addEventListener("click", function(event) {

    event.preventDefault();
    document.getElementById("cargaNombreEmpleado").value = empleadoSeleccionado;
    document.getElementById("cargaAreaEmpleado").value = areaempleadoSeleccionado;
    document.getElementById("cargaFechaEmpleado").value = "";
    document.getElementById("cargaHoraEntradaEmpleado").value = "";
    document.getElementById("cargaHoraSalidaEmpleado").value = "";
});
