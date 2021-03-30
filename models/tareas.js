const Tarea = require("./tarea");

class Tareas {
  
  _listado = {};

  get listadoArr(){

    const listado = [];
    Object.keys(this._listado).forEach((key)=>{
      const tarea = this._listado[key];
      listado.push(tarea)
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  //Metodo para borrar tarea
  borrarTarea( id = '') {

    if(this._listado[id]){
       delete this._listado[id];
    }
    
  }

  //Metodo para cargar las tareas
  cargarTareasFromArray( tareas = [] ){

    tareas.forEach( tarea => {
      this._listado[tarea.id] = tarea;
    });

  }

  //Metodo para crear tarea
  crearTarea( desc = '' ) {

    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;

  }

  //Metodo para listar todas las tareas
  listadoCompleto(){
    
      console.log();
      this.listadoArr.forEach( (tarea,i) => {

        const idx = `${i+1}`.green;
        const { desc, completadoEn } = tarea;
        const estado = ( completadoEn )
                          ? 'Completada'.green
                          : 'Pendiente'.red
        console.log(`${idx} ${desc} :: ${estado}`)

      })
  }
  //Metodo para listar todas las tareas completadas y pendientes
  listarPendientesCompletadas(completadas = true){

    console.log();
    let contador = 0;
    this.listadoArr.forEach( tarea =>{
      const {desc, completadoEn} = tarea;
      const estado = (completadoEn)
                        ? 'Completada'.green
                        : 'Pendiente'.red
      if(completadas) {
        if(completadoEn){
          contador +=1;
          console.log(`${contador.toString().green}. ${desc} :: ${completadoEn.red}`)
        }
      } else {
        if(!completadoEn){
          contador +=1;
          console.log(`${contador.toString().green}. ${desc} :: ${estado}`)
        }
      }
    })
  }
  toggleCompletadas( ids = [] ) {

    ids.forEach( id => {

      const tarea = this._listado[id];
      if( !tarea.completadoEn ) {
          tarea.completadoEn = new Date().toISOString()
      }

    });

    this.listadoArr.forEach( tarea => {
      if( !ids.includes(tarea.id) ){
        this._listado[tarea.id].completadoEn = null;
      }
    })

  }

}

module.exports = Tareas;