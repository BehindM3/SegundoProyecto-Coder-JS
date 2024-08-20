const urlCredencialesJSON = "json/credenciales.json";

//Hacemos aparecer y desaparecer los menu de Log-In para empleados 
document.getElementById("ingresoEmpleados").addEventListener("click", () => {
    let formularioIngresoEmpleado = document.getElementById("formularioEmpleados");
    formularioIngresoEmpleado.style.display = "flex"; 
})

document.getElementsByClassName("botonExit")[0].addEventListener("click", () => {
    let formularioIngresoEmpleado = document.getElementById("formularioEmpleados");
    let denegacion = document.querySelector(".msjCredencialesDenegadas");
    
    formularioIngresoEmpleado.style.display = "none";
    denegacion.style.display = "none"; 
})

//Hacemos aparecer y desaparecer los menu de Log-In para el admin 
document.getElementById("ingresoAdmin").addEventListener("click", () => {
    let formularioIngresoAdmin = document.getElementById("formularioAdmin");
    formularioIngresoAdmin.style.display = "flex"; 
})

document.getElementsByClassName("botonExit")[1].addEventListener("click", () => {
    let formularioIngresoAdmin = document.getElementById("formularioAdmin");
    let denegacion = document.querySelector(".msjCredencialesDenegadas");
    
    denegacion.style.display = "none"
    formularioIngresoAdmin.style.display = "none"; 

})

//Comprobacion de credenciales
async function comprobacionCredenciales(usuarioWeb, claveWeb){
    
    let usuarioIngresado = [];
    const credencialesJSON = await fetch(urlCredencialesJSON);
    const dataCredenciales = await credencialesJSON.json();
    const credencialesEmpleados = await dataCredenciales.empleados;
    
    
    credencialesEmpleados.forEach( async emp => {
        if(emp.usuario === usuarioWeb && emp.clave == claveWeb){
            usuarioIngresado = emp;            
        }
    });
    

    return usuarioIngresado;
}

//Redirigimos si las credenciales coinciden
function redireccionWeb( usuarioValidado ){
    
    if( !usuarioValidado ){
    
        let denegacion = document.querySelector(".msjCredencialesDenegadas");
        denegacion.style.display = "block"
    
    }else{
    
        localStorage.setItem("empleadoSeleccionado", JSON.stringify(usuarioValidado));
        window.location.href = "./pages/empleado.html";
    
    }
}

document.getElementById("submitEmpleados").addEventListener("click", async (ev) => {    

    ev.preventDefault();

    let usuarioEmpleadoWeb = document.getElementById("nombreUsuarioEmpleado").value;
    let claveEmpleadoWeb = document.getElementById("claveUsuarioEmpleado").value;

    const usuarioValidado = await comprobacionCredenciales(usuarioEmpleadoWeb,claveEmpleadoWeb);
    
    redireccionWeb( usuarioValidado);

    document.getElementById("nombreUsuarioEmpleado").value = "";
    document.getElementById("claveUsuarioEmpleado").value = "";
});