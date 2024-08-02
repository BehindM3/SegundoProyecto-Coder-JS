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


