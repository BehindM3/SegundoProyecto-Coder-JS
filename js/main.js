const UsuariosEmpleados = [{id: 1 ,usuario: "Javier", clave: "1234"}, {id: 2 ,usuario: "Ezequiel", clave: "abcd"}, {id: 3 ,usuario: "Lisandro", clave: "a1b2"}, {id: 4 ,usuario: "Luna", clave: "2001abc"}];
const Administrador = {usuario: "admin", clave: "admin", };
const Empleados = [{id: 1 ,usuario: "Javier", area: "Ingeniero"}, {id: 2 ,usuario: "Ezequiel", area: "RRHH"}, {id: 3 ,usuario: "Lisandro", area: "Gerente"}, {id: 4 ,usuario: "Luna", area: "Administrativo"}]

Empleados.forEach(empleado => {
    localStorage.setItem(empleado.usuario, empleado.area);
});

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

function redireccionWeb( validacion, usuario){
    if( validacion ){
        localStorage.setItem("empleadoSeleccionado", usuario);
        window.location.href = "pages/empleado.html";
    }
}

document.getElementById("submitEmpleados").addEventListener("click", () => {    

    let usuarioEmpleadoWeb = document.getElementById("nombreUsuarioEmpleado").value;
    let claveEmpleadoWeb = document.getElementById("claveUsuarioEmpleado").value;

    const validacion = comprobacionCredenciales(usuarioEmpleadoWeb,claveEmpleadoWeb);

    redireccionWeb( validacion, usuarioEmpleadoWeb);

    document.getElementById("nombreUsuarioEmpleado").value = "";
    document.getElementById("claveUsuarioEmpleado").value = "";
});