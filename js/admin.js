const urlCredencialesJSON = "../json/credenciales.json";

//Funcion para traer los nombres de los empleados desde el JSON
async function arrayNombreDeEmpleados(){

    const credencialesJSON = await fetch(urlCredencialesJSON);
    const credenciales = await credencialesJSON.json();
    const credencialesEmpleados = await credenciales.empleados;
    const nombreEmpleados = credencialesEmpleados.map(empl => empl.usuario);
    
    return nombreEmpleados;    
}

//Funcion flecha para guardar todo el historial almacenado
const historialCompleto = (historial) => { 
    return historial.map( (empl) =>  {

        let horarioEnObjeto = JSON.parse(localStorage.getItem(empl));
        let horarioConNombres = [];

        if(horarioEnObjeto != null){
            
            horarioConNombres = horarioEnObjeto.map( hor => {

                hor = {
                    nombre: empl,
                    ...hor
                };

                return hor;

            });

        }

        return horarioConNombres;
    
    }).filter(pos => pos != null).flat(2); 
};

//Funcion flecha que devuelve un array filtrado por nombre 
const horariosNombreFiltrado = (nombreFiltro) => {
    return JSON.parse(localStorage.getItem(nombreFiltro));
}

//Devuelve un array de todos los horarios almacenados
function horariosFechaEmpleados (historial, fechaFiltro){

    let arrayHistorialFechas = historial.map( (horario) => {

        return horario.fecha == fechaFiltro? horario : null; 

    });

    const historialFechasFiltrado = arrayHistorialFechas.filter(pos => pos != null);

    return historialFechasFiltrado;
}

//Devuelve un array del historial del empleado seleccionado en la fecha solicitada 
function filtroEmpleadoYHorarios (nombreFiltro, fecha) {

    const horariosEmpeladoBuscado = horariosNombreFiltrado(nombreFiltro);

    const filtroEmplHor = horariosEmpeladoBuscado.map( empl => {
        return empl.fecha == fecha ? empl : null;
    } );
    
    return filtroEmplHor.filter( pos => pos != null);
}

//Funciones para el limpiado y escrito de Historiales
const vaciarElemento = (elemento) =>  elemento != null ? elemento.remove() : null ;

function imprimirHistorial( historial , nombreEmpleado){

    let sectionHistorial = document.querySelector(".contenedorHistorialEmpleadosAdmin");
    let article = document.createElement("article");
    let mensajeDeDenegacion = document.querySelector(".peticionInvalida"); 
    let articleAnterior = document.querySelector(".historialesSolicitadoPorAdmin");

    article.className = "historialesSolicitadoPorAdmin";

    vaciarElemento(mensajeDeDenegacion);
    vaciarElemento(articleAnterior);


    if( historial == null){

        const mensajePeticionInvalida = document.createElement("p");

        mensajePeticionInvalida.className = "peticionInvalida";
        mensajePeticionInvalida.innerText = `No existe ningun horario que cumpla con ese filtro`;

        sectionHistorial.appendChild(mensajePeticionInvalida);
    }
    else if( historial != null && historial.length != 0){

        historial.forEach( (horario) => {           

            const divHistorial = document.createElement("div");

            divHistorial.className = `historialesSolicitadoPorAdmin--Empleado`;
            divHistorial.innerHTML = `
            <div>${horario.nombre != null? horario.nombre : nombreEmpleado}</div>
            <div>${horario.area}</div>
            <div>${horario.fecha}</div>
            <div>${horario.entrada}</div>
            <div>${horario.salida}</div>
            <div><button type="button" class="botonEliminarHorario" id="botonEliminarHorario" >Eliminar</button></div>
            `;

            article.appendChild(divHistorial);
        } );

        sectionHistorial.appendChild(article);
        
    }else{

        const mensajePeticionInvalida = document.createElement("p");

        mensajePeticionInvalida.className = "peticionInvalida";
        mensajePeticionInvalida.innerText = `No existen horarios cargados`;

        sectionHistorial.appendChild(mensajePeticionInvalida);

    }

}


//Funcion de filtros 
async function filtrado(empleadoSolicitado, fechaSolicitada) {

    let historialSolicitado = null;
    const nombreEmpleados = await arrayNombreDeEmpleados();
    const historialSinFiltro = historialCompleto(nombreEmpleados);
    

    let horariosEmpleados = historialSinFiltro.map( historial => historial.fecha );

    const validacionNombre = nombreEmpleados.includes(empleadoSolicitado);
    const validacionFecha = horariosEmpleados.includes(fechaSolicitada);
    

    if( empleadoSolicitado == "" && fechaSolicitada == ""){
        
        historialSolicitado = historialSinFiltro;

    }
    else if( validacionNombre && fechaSolicitada == ""){

        historialSolicitado = horariosNombreFiltrado(empleadoSolicitado);
        
    }
    else if( !validacionNombre && validacionFecha ){

        historialSolicitado = horariosFechaEmpleados(historialSinFiltro, fechaSolicitada);

    }
    else if(validacionNombre && validacionFecha){

        historialSolicitado = filtroEmpleadoYHorarios(empleadoSolicitado, fechaSolicitada);

    }

    imprimirHistorial(historialSolicitado, empleadoSolicitado);
}

//Funcion limpiar inputs
const limpiarInputs = () => {
    document.querySelector("#busquedaNombreEmpleado").value = "";
    document.querySelector("#busquedaFechaEmpleado").value = "";
};

//Se escucha el evento click del boton 'Buscar' 
document.querySelector("#botonBuscarHistoriales").addEventListener("click", (event) => {

    event.preventDefault();

    let nombreEmpleadoBuscado = document.querySelector("#busquedaNombreEmpleado").value;
    let fechaBuscada = document.querySelector("#busquedaFechaEmpleado").value;
    
    filtrado(nombreEmpleadoBuscado, fechaBuscada);
});

//Se resetean los valores al apretar el boton 'Limpiar'
document.querySelector("#botonLimpiarCredencialesBusqueda").addEventListener("click", (event) => {
    
    event.preventDefault();
    limpiarInputs();
});

//Eliminamos el horario que se pasa por referencia

function eliminarHorario (horarioEliminar){ 

    const almacenjeEmpleadoSolicitado = JSON.parse(localStorage.getItem(horarioEliminar.nombre));
    let indiceHorario = -1;

    for ( horario in almacenjeEmpleadoSolicitado){

        if( almacenjeEmpleadoSolicitado[horario].fecha == horarioEliminar.fecha ){
            if( almacenjeEmpleadoSolicitado[horario].entrada == horarioEliminar.entrada ){
                if(almacenjeEmpleadoSolicitado[horario].salida == horarioEliminar.salida ){
                    indiceHorario = horario;
                }
            }
        }        

    }

    almacenjeEmpleadoSolicitado.splice(indiceHorario, 1);
    
    localStorage.removeItem(horarioEliminar.nombre);

    if( almacenjeEmpleadoSolicitado.length != 0 ){
        localStorage.setItem( horarioEliminar.nombre, JSON.stringify(almacenjeEmpleadoSolicitado) );
    }

}

//Se elimina el horario al clickear el boton eliminar
const eliminarHorariosLlamado = () => {
    
    document.querySelector(".contenedorHistorialEmpleadosAdmin").addEventListener("click", (event) =>  {

        if( event.target.nodeName == "BUTTON"){
            
            const inputNombre = document.getElementById("busquedaNombreEmpleado").value;
            const inputFecha = document.getElementById("busquedaFechaEmpleado").value;

            const horarioClickeado = event.target.closest('.historialesSolicitadoPorAdmin--Empleado');
            const infoHorario = horarioClickeado.querySelectorAll('div');
            
            let arrayInfoHorario = [];
            
            infoHorario.forEach( prop => {
                arrayInfoHorario.unshift(prop.innerText);
            });
            
    
            const objetoHorario = {
                nombre: arrayInfoHorario[5],
                area: arrayInfoHorario[4],
                fecha: arrayInfoHorario[3],
                entrada: arrayInfoHorario[2],
                salida: arrayInfoHorario[1]
            };
            
            eliminarHorario(objetoHorario);
        
            filtrado(inputNombre , inputFecha);
    
        }
    });
};



//Refrescar la pagina e historial
document.addEventListener('DOMContentLoaded', () => {

    filtrado("","");

    eliminarHorariosLlamado();
    

});