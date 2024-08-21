const fechaActual = new Date().toISOString().split('T')[0];
document.getElementById("busquedaFechaEmpleado").value = fechaActual;


function filtrado(nombre, fecha) {

    

}

//Funcion limpiar inputs
const limpiarInputs = () => {
    document.querySelector("#busquedaNombreEmpleado").value = "";
    document.querySelector("#busquedaFechaEmpleado").value = fechaActual;
};

//Se escucha el evento click del boton 'Buscar' 
document.querySelector("#botonBuscarHistoriales").addEventListener("click", (event) => {

    event.preventDefault();

    let nombreEmpleadoBuscado = document.querySelector("#busquedaNombreEmpleado").value;
    let fechaBuscada = document.querySelector("#busquedaFechaEmpleado").value;


    filtrado(nombreEmpleadoBuscado, fechaBuscada);


    limpiarInputs();
});

//Se resetean los valores al apretar el boton 'Limpiar'
document.querySelector("#botonLimpiarCredencialesBusqueda").addEventListener("click", (event) => {
    
    event.preventDefault();

    limpiarInputs();
})