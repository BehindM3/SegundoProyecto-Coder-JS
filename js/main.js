const UsuariosEmpleados = [{id: 1 ,usuario: "Javier", clave: "1234"}, {id: 2 ,usuario: "Ezequiel", clave: "abcd"}];
const Administrador = {usuario: "admin", clave: "admin"};

let empleadoSeleccionado

document.getElementById("ingresoEmpleados").addEventListener("click", () => {
    let formularioIngresoAdmin = document.getElementById("formularioEmpleados");
    formularioIngresoAdmin.style.display = "flex"; 
})

document.getElementsByClassName("botonExit")[0].addEventListener("click", () => {
    let formularioIngresoAdmin = document.getElementById("formularioEmpleados");
    formularioIngresoAdmin.style.display = "none"; 
})


document.getElementById("ingresoAdmin").addEventListener("click", () => {
    let formularioIngresoAdmin = document.getElementById("formularioAdmin");
    formularioIngresoAdmin.style.display = "flex"; 
})

document.getElementsByClassName("botonExit")[1].addEventListener("click", () => {
    let formularioIngresoAdmin = document.getElementById("formularioAdmin");
    formularioIngresoAdmin.style.display = "none"; 
})

function comprobacionCredenciales(usuarioWeb, claveWeb){
    let validacion = false;

    for( empleado of UsuariosEmpleados ){
        if(usuarioWeb === empleado.usuario && claveWeb === empleado.clave){
          validacion = true;   
        }
    }

    return validacion
}

function redireccionWeb(pagWeb, validacion, usuario){
    if( validacion ){
        empleadoSeleccionado = usuario;
        window.location.href = pagWeb;
    }
}

document.getElementById("submitEmpleados").addEventListener("click", () => {    

    let usuarioEmpleadoWeb = document.getElementById("nombreUsuarioEmpleado").value;
    let claveEmpleadoWeb = document.getElementById("claveUsuarioEmpleado").value;

    const validacion = comprobacionCredenciales(usuarioEmpleadoWeb,claveEmpleadoWeb);

    redireccionWeb("../pages/empleado.html", validacion, usuarioEmpleadoWeb);

    document.getElementById("nombreUsuarioEmpleado").value = "";
    document.getElementById("claveUsuarioEmpleado").value = "";
});


//Empleados 

const horariosEmpleados = [];

document.getElementById("cargaNombreEmpleado").value = empleadoSeleccionado;

function agregarNuevoHorario(nombre, fecha, entrada, salida, area){


}

document.getElementById("submitCargarHorario").addEventListener("click", () => {
    
    let nombreEmpleadoCargaHorario = document.getElementById("cargaNombreEmpleado");
    let fechaCargaHorario = document.getElementById(cargaFechaEmpleado);
    let entradaCargaHorario = document.getElementById(cargaHoraEntradaEmpleado);
    let salidaCargaHorario = document.getElementById(cargaHoraSalidaEmpleado);
    let areaTrabajoCargaHorario = document.getElementById(cargaAreaEmpleado);

    


});