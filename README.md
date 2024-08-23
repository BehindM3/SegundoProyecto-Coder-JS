Pagina que tiene como objetivo organizar y administrar los horarios de empleados de una empresa: 

Funcionamientos actuales :
    
    Seccion Empleados:
        -Puede accederse al apartado de empleados con diferentes credenciales:
            {
                usuario: Javier     clave: 1234
                usuario: Santiago   clave: abcd
                usuario: Lisandro   clave: a1b2
                usuario: Luna       clave: 2001abc
                usuario: Edson      clave: 12345
            }

            Pueden agrefarse mas desde el archivo JSON (posible futura implementacion, apartado para agregarlo desde el menu administrador).
        
        -Agregar horarios cumplidos en la empresa, que se guardan en el "Local Storage", para siempre ser visible

    Seccion Administrador:
        -Pueden obtenerse 4 tipos de filtros, para la busqueda del horario que se desee:
            
            _Historial completo (Al dejar vacio ambos campos).
            _Por el nombre (Se debe limpiar la fecha previamente, ya que se precarga para facilitar otras busquedas).
            _Por la fecha (Dejando el campo del nombre vacio).
            _Por el nombre y la fecha.
            
            _Cualquier otro caso se emitiran mensajes en el apartado de "Horarios" notificando que no se encunetra dicha solicitud o en caso de no existir historial alguno se hara saber.
        
        -Puede eliminarse un horario cargado tanto del apartado visual como del "Local storage" haciendo uso del boton "Eliminar". 


Ultima modificacion 23/08/2024 - Peralta Santiago 