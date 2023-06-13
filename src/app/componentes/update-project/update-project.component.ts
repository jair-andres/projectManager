import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {

  constructor(private peticion:PeticionUsuariosService, private msg:MensajesService, private activateRoute:ActivatedRoute) {}

  miId:string = ""
  miAlias:string =""
  
  idProyecto:any = ""
  detalleProyecto:any[] = []
  nombreProyecto:string =""
  descripcion:string =""
  objetivo:string =""
  keyUser:string =""
  fechaEntrega:string =""
  prosupuesto:string =""
  miembros:any[]=[]
  tareas:any[]=[]

  tareasInfo:any[]=[]
  miembrosInfo:any[]=[]

  resultadoBusquedaEncargado:any[] = []


  ngOnInit():void {
    this.miData()
    this.idProyectoGet()
  }

  miData(){
    let post = {
      hots:this.peticion.urllocal,
      path:"miData",
      payload:{}
    }
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      this.miId = res.id
      this.miAlias = res.alias
    })
  }

  idProyectoGet() {
    this.idProyecto = this.activateRoute.snapshot.paramMap.get('idProject')
    console.log("ID del proyecto : ",this.idProyecto);
    this.detalleProducto(this.idProyecto)
  }


  detalleProducto(id:string) {
    let post = {
      host:this.peticion.urllocal,
      path:"Proyectos/detalleProyecto",
      payload:{
        idProyect:id
      }
    }
    this.peticion.Post(post.host + post.path, post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.detalleProyecto=res?.datos[0]
        console.log(this.detalleProyecto)
        this.nombreProyecto = res?.datos[0].nombreProyecto
        this.descripcion = res?.datos[0].descripcion
        this.objetivo = res?.datos[0].objetivo
        this.keyUser = res?.datos[0].keyUser
        this.fechaEntrega = res?.datos[0].fechaEntrega
        this.prosupuesto = res?.datos[0].prosupuesto
        this.miembros = res?.datos[0].miembros
        this.tareas = res?.datos[0].tareas

        this.tareasInfo = res?.datos[0].tareasInfo
        this.miembrosInfo = res?.datos[0].miembrosInfo
      }
      
    })
  }

  consoleTODO(){
    console.log("this.miId : ",this.miId)
    console.log("this.miAlias : ",this.miAlias)
  
    console.log("this.idProyecto : ",this.idProyecto)
    console.log("this.detalleProyecto : ",this.detalleProyecto)
    console.log("this.nombreProyecto : ",this.nombreProyecto)
    console.log("this.descripcion : ",this.descripcion)
    console.log("this.objetivo : ",this.objetivo)
    console.log("this.keyUser : ",this.keyUser)
    console.log("this.fechaEntrega : ",this.fechaEntrega)
    console.log("this.prosupuesto : ",this.prosupuesto)
    console.log("this.miembros : ",this.miembros)
    console.log("this.tareas : ",this.tareas)

    console.log("this.tareasInfo : ",this.tareasInfo)
    console.log("this.miembrosInfo : ",this.miembrosInfo)
  }

  QuitarMiembros(idMiembro:string){
    // console.log("ID => ",idMiembro)
    let quitarDeMiembros:number = this.miembros.indexOf(idMiembro)
    this.miembros.splice(quitarDeMiembros,1)
    //
    let foe:any = (elArray:any) => elArray._id == idMiembro
    let quitarDeMiembrosInfo:number = this.miembrosInfo.findIndex(foe)
    // console.log("Quitar este index en miembrosInfo: ",quitarDeMiembrosInfo)
    let suNombre:string = this.miembrosInfo[quitarDeMiembrosInfo]?.alias
    this.miembrosInfo.splice(quitarDeMiembrosInfo,1)
    let mensaje:string = `${suNombre} eliminado con éxito`
    this.msg.Load(mensaje, "success", 5000)
  }

  QuitarTareas(idTarea:string){
    console.log("Quiero quitar esta tarea : ",idTarea)
  }

  CambiarEncargado(){
    console.log("cambiar encargado")
  }

  NuevaActividad(){
    console.log("Queremos añadir una nueva actividad")
  }

  QuitarActividad(indexActividad:any, idTarea:string){
    console.log("index de la actividad : ",indexActividad)
    console.log("id de la tarea donde estamos : ",idTarea)
    let foo:any = (elArray:any) => elArray._id == idTarea
    let indexDeLaTareaDondeEstaLaActividad:number = this.tareasInfo.findIndex(foo)
    console.log("index de la tarea en tareasInfo : ",indexDeLaTareaDondeEstaLaActividad)
    this.tareasInfo[indexDeLaTareaDondeEstaLaActividad].actividades.splice(indexActividad,1)
    let mensaje:string = "Actividad elmininada con  éxito"
    this.msg.Load(mensaje, "success", 5000)
  }

  ActualizarTarea(){
    console.log("actualizar esta tarea")
  }

  QuieroEliminarTarea(){
    console.log("quiero eliminar esta tarea")
  }
}
