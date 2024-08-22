//Cambiar direccion al subirlo a github ya que lee direcciones desde el root y no desde la posicion del archivo
const urlCredencialesJSON = "json/credenciales.json";
const redirEmpleados = "pages/empleado.html";
const redirAdmin = "pages/admin.html";

//Hacemos aparecer y desaparecer los menu de Log-In para empleados 
document.getElementById("ingresoEmpleados").addEventListener("click", () => {
    let formularioIngresoEmpleado = document.getElementById("formularioEmpleados");
    formularioIngresoEmpleado.style.display = "flex"; 
})

document.getElementsByClassName("botonExit")[0].addEventListener("click", () => {
    let formularioIngresoEmpleado = document.getElementById("formularioEmpleados");
    let denegacion = document.querySelector("#msjCredencialesDenegadasEmpleado");
    
    formularioIngresoEmpleado.style.display = "none";
    denegacion.style.display = "none";

    document.getElementById("nombreUsuarioEmpleado").value = "";
    document.getElementById("claveUsuarioEmpleado").value = "";
})

//Hacemos aparecer y desaparecer los menu de Log-In para el admin 
document.getElementById("ingresoAdmin").addEventListener("click", () => {
    let formularioIngresoAdmin = document.getElementById("formularioAdmin");
    formularioIngresoAdmin.style.display = "flex"; 
})

document.getElementsByClassName("botonExit")[1].addEventListener("click", () => {
    let formularioIngresoAdmin = document.getElementById("formularioAdmin");
    let denegacion = document.querySelector("#msjCredencialesDenegadasAdmin");
    
    denegacion.style.display = "none"
    formularioIngresoAdmin.style.display = "none"; 

    document.getElementById("nombreUsuarioAdmin").value = "";
    document.getElementById("claveUsuarioAdmin").value = "";
})

//Comprobacion de credenciales
async function comprobacionCredenciales(usuarioWeb, claveWeb, filtro){
    
    let usuarioIngresado = null;
    const credencialesJSON = await fetch(urlCredencialesJSON);
    const dataCredenciales = await credencialesJSON.json();
    let credencialesEmpleados = await dataCredenciales.empleados;;

    if( filtro == "admin" ){
        credencialesEmpleados = await dataCredenciales.admin;
    }

    credencialesEmpleados.forEach( async emp => {
        if(emp.usuario === usuarioWeb && emp.clave == claveWeb){
            usuarioIngresado = emp;
        }
    });
    

    return usuarioIngresado;
}

//Redirigimos si las credenciales coinciden
function redireccionWebEmpleados( usuarioValidado ){

    if( usuarioValidado == null ){
    
        let denegacion = document.querySelector("#msjCredencialesDenegadasEmpleado");
        denegacion.style.display = "block"
    
    }else{

        localStorage.setItem("empleadoSeleccionado", JSON.stringify(usuarioValidado));
        window.location.href = redirEmpleados;
    
    }
}

function redireccionWebAdmin( usuarioValidado ){

    if( usuarioValidado == null ){
    
        let denegacion = document.querySelector("#msjCredencialesDenegadasAdmin");
        denegacion.style.display = "block"

    }else{

        window.location.href = redirAdmin;
    }
}

//Comprobamos los formularios al enviarlos
document.getElementById("submitEmpleados").addEventListener("click", async (ev) => {    

    ev.preventDefault();

    let usuarioEmpleadoWeb = document.getElementById("nombreUsuarioEmpleado").value;
    let claveEmpleadoWeb = document.getElementById("claveUsuarioEmpleado").value;

    const usuarioValidado = await comprobacionCredenciales(usuarioEmpleadoWeb,claveEmpleadoWeb, "empleados");
    
    redireccionWebEmpleados( usuarioValidado);

    document.getElementById("nombreUsuarioEmpleado").value = "";
    document.getElementById("claveUsuarioEmpleado").value = "";

});

document.getElementById("submitAdmin").addEventListener("click", async (ev) => {    

    ev.preventDefault();

    let usuarioAdminWeb = document.getElementById("nombreUsuarioAdmin").value;
    let claveAdminWeb = document.getElementById("claveUsuarioAdmin").value;

    const adminValidado = await comprobacionCredenciales(usuarioAdminWeb,claveAdminWeb, "admin");
    
    redireccionWebAdmin( adminValidado);

    document.getElementById("nombreUsuarioAdmin").value = "";
    document.getElementById("claveUsuarioAdmin").value = "";
});