const Empleados = [
    {id: 1 ,usuario: "Javier", area: "Ingeniero"},
    {id: 2 ,usuario: "Santiago", area: "RRHH"},
    {id: 3 ,usuario: "Lisandro", area: "Gerente"},
    {id: 4 ,usuario: "Luna", area: "Administrativo"}
]

const UsuariosEmpleados = [
    {id: 1 ,usuario: "Javier", clave: "1234"},
    {id: 2 ,usuario: "Santiago", clave: "abcd"},
    {id: 3 ,usuario: "Lisandro", clave: "a1b2"},
    {id: 4 ,usuario: "Luna", clave: "2001abc"}
]

const Administrador = {usuario: "admin", clave: "admin" };

//Recargamos en el Local-Storage todas las  credenciales de empleados 
Empleados.forEach(empleado => {
    localStorage.setItem(empleado.usuario, JSON.stringify(empleado));
});

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
function comprobacionCredenciales(usuarioWeb, claveWeb){
    let usuarioIngresado = null;

    for( user of UsuariosEmpleados ){
        if(usuarioWeb === user.usuario && claveWeb === user.clave){

            Empleados.forEach( (empl) => {
                if( user.id == empl.id){
                    usuarioIngresado = empl;
                }
          })
          
          console.log(usuarioIngresado);
        
        }
    }

    

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

document.getElementById("submitEmpleados").addEventListener("click", (ev) => {    

    ev.preventDefault();

    let usuarioEmpleadoWeb = document.getElementById("nombreUsuarioEmpleado").value;
    let claveEmpleadoWeb = document.getElementById("claveUsuarioEmpleado").value;

    const usuarioValidado = comprobacionCredenciales(usuarioEmpleadoWeb,claveEmpleadoWeb);

    redireccionWeb( usuarioValidado);

    document.getElementById("nombreUsuarioEmpleado").value = "";
    document.getElementById("claveUsuarioEmpleado").value = "";
});

