require("colors");
const { guardarDB,leerDB } = require("./helpers/guardarArchivo");
// const { showMenu, pause } = require("./helpers/mensajes");
const { 
  inquirerMenu, 
  pausa, 
  leerInput, 
  listadoTareasBorrar, 
  confirmar,
  mostrarListadoCheckList
 } = require('./helpers/inquirer');
// const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

const main = async() => {

  let opt='';
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if( tareasDB ) { //cargar tareas.
     tareas.cargarTareasFromArray(tareasDB);
  }


  do {
    //Imprime el menu
    opt = await inquirerMenu();

   switch (opt) {
      case '1':
        const desc = await leerInput('Descripción:');
        tareas.crearTarea(desc);
      break;
   
      case '2':
        tareas.listadoCompleto();
      break;

      case '3': //Listar completadas
        tareas.listarPendientesCompletadas(true);
      break;
      case '4': //Listar Pendientes
        tareas.listarPendientesCompletadas(false);
      break;
      case '5': //Completado | Pendiente
        const ids = mostrarListadoCheckList(tareas.listadoArr);
        tareas.toggleCompletadas( ids );
      break;
      case '6': //Listar Pendientes
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if(id!=='0'){
          const ok = await confirmar('¿Estas Seguro?')
          if( ok ){
            tareas.borrarTarea( id );
            console.log("Tarea Borrada")
          }
        }
      break;

   }

   guardarDB(tareas.listadoArr);

    await pausa();

  } while (opt !== '0');
  
}

main();