const UsuariosEmpleados = [{id: 1 ,usuario: "Javier", clave: "1234"}, {id: 2 ,usuario: "Ezequiel", clave: "abcd"}];
const Administrador = {usuario: "admin", clave: "admin"};

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

function redireccionWeb(pagWeb, validacion){
    if( validacion ){
        window.location.href = "../pages/admin"
    }
}

document.getElementById("submitAdmin").addEventListener("click", () => {    

    let usuarioAdminWeb = document.getElementById("nombreUsuarioAdmin").value;
    let claveAdminWeb = document.getElementById("claveUsuarioAdmin").value;

    document.getElementById("nombreUsuarioAdmin").value = "";
    document.getElementById("claveUsuarioAdmin").value = "";

    const validacion = comprobacionCredenciales(usuarioAdminWeb,claveAdminWeb);

    console.log(validacion);
    
});