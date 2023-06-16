import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';

declare var window: any; 
@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {

  constructor(private peticion:PeticionUsuariosService, private msg:MensajesService, private activateRoute:ActivatedRoute, private route:Router) {}

  cambiarEncargadoModal:any
  actividadesContainer:any

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

  busquedaEncargado:string =""
  resultadoBusquedaEncargado:any[] = []
  idTemporalTarea:string =""

  miembrosEliminados:string[] = []
  eliminadosInfo:any[] = []
  
  ProyectoIsOk:boolean = false // done
  TareaIsOk:boolean = false // done
  TareasEnUsuariosIsOk:boolean = false // done
  countTareasEnUsuariosIsOk:number = 0 // done
  ProyectoEnUsuariosIsOk:boolean = false //done
  countProyectoEnUsuariosIsOk:number = 0 //done
  EliminadosIsOk:boolean = false // done
  countEliminadosIsOk:number = 0 // done

  ngOnInit():void {
    this.cambiarEncargadoModal = new window.bootstrap.Modal(
      document.getElementById('cambiarEncargadoModal')
    )
    this.actividadesContainer = window.document.getElementById("actividadesContainer")
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

  ActualizarMiembros(newArrayMembers:any[]){
    this.miembros.push(newArrayMembers[0].id)
    if(this.miembrosEliminados.indexOf(newArrayMembers[0].id) !== -1){
      let indexTempo = this.miembrosEliminados.indexOf(newArrayMembers[0].id)
      this.miembrosEliminados.splice(indexTempo,1)
    }

    let LocalNuevoMiembro:any[] =[]

    let post = {
      host:this.peticion.urllocal,
      path:"Usuarios/CargarId",
      payload:{
        id:newArrayMembers[0].id
      }
    }
    this.peticion.Post(post.host + post.path, post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        LocalNuevoMiembro = res.datos[0]
        this.miembrosInfo.push(LocalNuevoMiembro)
      }
    })

  }

  QuitarMiembros(idMiembro:string){
    this.miembrosEliminados.push(idMiembro)
    let quitarDeMiembros:number = this.miembros.indexOf(idMiembro)
    this.miembros.splice(quitarDeMiembros,1)
    let foe:any = (elArray:any) => elArray._id == idMiembro
    let quitarDeMiembrosInfo:number = this.miembrosInfo.findIndex(foe)
    let suNombre:string = this.miembrosInfo[quitarDeMiembrosInfo]?.alias
    let miembroInfoEliminado = this.miembrosInfo.splice(quitarDeMiembrosInfo,1)
    this.eliminadosInfo.push(miembroInfoEliminado[0])
    let mensaje:string = `${suNombre} eliminado con éxito`
    this.msg.Load(mensaje, "success", 5000)
  }

  AbrirCambiarEncargadoModal(idTarea:string){
    this.idTemporalTarea = idTarea
    this.cambiarEncargadoModal.show()
  }

  CambiarEncargado(){
    let post = {
      hots:this.peticion.urllocal,
      path:"Usuarios/Buscar",
      payload:{
        foo:this.busquedaEncargado
      }
    }
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.resultadoBusquedaEncargado = res?.datos
      }
    })
  }

  AnadirNuevoEncargado(){
    let foa:any = (elArray:any) => elArray._id == this.idTemporalTarea
    let indexDeLaTarea:number = this.tareasInfo.findIndex(foa)
    this.tareasInfo[indexDeLaTarea].keyEncargado = this.resultadoBusquedaEncargado[0]._id
    this.tareasInfo[indexDeLaTarea].miembros = this.resultadoBusquedaEncargado[0]
    this.cambiarEncargadoModal.toggle()
  }

  NuevaActividad(idTarea:string){
    let fuo:any = (elArray:any) => elArray._id == idTarea
    let indexDeLaTareaDondeEstaLaActividad:number = this.tareasInfo.findIndex(fuo)
    let idTempo:string = this.tareasInfo[indexDeLaTareaDondeEstaLaActividad].actividades.length
    this.tareasInfo[indexDeLaTareaDondeEstaLaActividad].actividades.push(
      {id: idTempo,
      actividad: "",
      finalisada:false}
    )
  }

  CheckActividad(indexActividad:any, idTarea:string){
    let fuo:any = (elArray:any) => elArray._id == idTarea
    let indexDeLaTareaDondeEstaLaActividad:number = this.tareasInfo.findIndex(fuo)
    if(this.tareasInfo[indexDeLaTareaDondeEstaLaActividad].actividades[indexActividad].finalisada == false){
      this.tareasInfo[indexDeLaTareaDondeEstaLaActividad].actividades[indexActividad].finalisada = true
    } else {
      this.tareasInfo[indexDeLaTareaDondeEstaLaActividad].actividades[indexActividad].finalisada = false
    }
    
  }

  QuitarActividad(indexActividad:any, idTarea:string){
    let foo:any = (elArray:any) => elArray._id == idTarea
    let indexDeLaTareaDondeEstaLaActividad:number = this.tareasInfo.findIndex(foo)
    this.tareasInfo[indexDeLaTareaDondeEstaLaActividad].actividades.splice(indexActividad,1)
    let mensaje:string = "Actividad elmininada con  éxito"
    this.msg.Load(mensaje, "success", 5000)
  }

  EnviarComentario(idTarea:string){
    let foo:any = (elArray:any) => elArray._id == idTarea
    let indexDeLaTareaDondeEstaLaActividad:number = this.tareasInfo.findIndex(foo)
    let toStringId = idTarea.toString()
    let elId = "formControlComentariosNuevo"+idTarea
    let comentarioTextarea:any = window.document.getElementById("formControlComentariosNuevo"+idTarea)
    let nuevoComentario:string = comentarioTextarea.value
    let today = new Date();

    let creoUnNuevoComentario:any = {
      date : today,
      autor : this.miAlias,
      autorId : this.miId,
      comentario : nuevoComentario
    } 
    if(this.tareasInfo[indexDeLaTareaDondeEstaLaActividad].comentarios == undefined){
      this.tareasInfo[indexDeLaTareaDondeEstaLaActividad].comentarios = []
      this.tareasInfo[indexDeLaTareaDondeEstaLaActividad].comentarios.push(creoUnNuevoComentario)
    } else {
      this.tareasInfo[indexDeLaTareaDondeEstaLaActividad].comentarios.push(creoUnNuevoComentario)
    }
    comentarioTextarea.value = ""
  }

  ActualizarUnaTarea(idTarea:string){
    let foo:any = (elArray:any) => elArray._id == idTarea
    let indexDeLaTareaDondeEstaLaActividad:number = this.tareasInfo.findIndex(foo)
    
    let post = {
      hots:this.peticion.urllocal,
      path:"Tareas/Actualizar",
      payload:{
        id:idTarea,
        titulo:this.tareasInfo[indexDeLaTareaDondeEstaLaActividad].titulo,
        descripcion:this.tareasInfo[indexDeLaTareaDondeEstaLaActividad].descripcion,
        fechaInicio:this.tareasInfo[indexDeLaTareaDondeEstaLaActividad].fechaInicio,
        fechaFinal:this.tareasInfo[indexDeLaTareaDondeEstaLaActividad].fechaFinal,
        actividades:this.tareasInfo[indexDeLaTareaDondeEstaLaActividad].actividades,
        comentarios:this.tareasInfo[indexDeLaTareaDondeEstaLaActividad].comentarios,
        estado:this.tareasInfo[indexDeLaTareaDondeEstaLaActividad].estado,
        keyEncargado:this.tareasInfo[indexDeLaTareaDondeEstaLaActividad].keyEncargado,
        miembros:this.tareasInfo[indexDeLaTareaDondeEstaLaActividad].miembros,
      }
    }
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.msg.Load(res.mensaje, "success", 5000)
        location.reload()
      }
    })
  }

  QuieroEliminarTarea(idTarea:string){
    console.log("quiero eliminar esta tarea")
  }
  
  QuitarTareas(idTarea:string){
    console.log("Quiero quitar esta tarea : ",idTarea)
  }

  ActualizarProyecto(){
    let post = {
      hots:this.peticion.urllocal,
      path:"Proyectos/Actualizar",
      payload:{
        id:this.idProyecto,
        nombreProyecto: this.nombreProyecto,
        descripcion: this.descripcion,
        objetivo: this.objetivo,
        fechaEntrega: this.fechaEntrega,
        prosupuesto:this.prosupuesto,
        miembros:this.miembros,
        tareas:this.tareas,
      }
    }
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.ProyectoIsOk = true
        this.tareasInfo.map( tarea => this.ActualizarTodasLasTareas(this.idProyecto,tarea))
        this.miembrosInfo.map( miembro => this.ActualizarUsuarioConProyecto(this.idProyecto,miembro._id))
        if(this.miembrosEliminados.length > 0){
          this.miembrosEliminados.map( miembro => this.ActualizarLosEliminados(miembro))
        } else {
          this.EliminadosIsOk = true
        }
      }
    })
  }

  ActualizarTodasLasTareas(idProyecto:string, tarea:any){
    let post = {
      hots:this.peticion.urllocal,
      path:"Tareas/Actualizar",
      payload:{
        id:tarea._id,
        titulo:tarea.titulo,
        descripcion:tarea.descripcion,
        fechaInicio:tarea.fechaInicio,
        fechaFinal:tarea.fechaFinal,
        actividades:tarea.actividades,
        keyEncargado:tarea.keyEncargado,
        miembros:tarea.miembros,
        comentarios:tarea.comentarios,
        estado:tarea.estado
      }
    }
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.TareaIsOk = true
        this.ActualizarUsuarioConTarea(tarea.keyEncargado,tarea._id)
      }
    })
  }

  ActualizarUsuarioConTarea(idUsuario:string, idTarea:string){
    let foo:any = (elArray:any) => elArray._id == idUsuario
    let indexDelUsuaruio:number = this.miembrosInfo.findIndex(foo)
    if(this.miembrosInfo[indexDelUsuaruio].misTareas.indexOf(idTarea) == -1){
      this.miembrosInfo[indexDelUsuaruio].misTareas.push(idTarea)
      let post = {
        hots:this.peticion.urllocal,
        path:"Usuarios/Actualizar",
        payload:{
          id:idUsuario,
          misTareas:this.miembrosInfo[indexDelUsuaruio].misTareas
        }
      }
      this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
        if(res.state == false){
          this.msg.Load(res.mensaje, "danger", 5000)
        } else {
          this.msg.Load(res.mensaje, "success", 5000)
        }
      })
    }
    this.countTareasEnUsuariosIsOk++
    if(this.countTareasEnUsuariosIsOk == this.miembros.length){
      this.TareasEnUsuariosIsOk = true
    }
    if(this.ProyectoIsOk == true && this.TareaIsOk == true && this.TareasEnUsuariosIsOk == true && this.ProyectoEnUsuariosIsOk == true && this.EliminadosIsOk == true){
      this.route.navigate([`proyectos/${this.idProyecto}`])
    }
  }

  ActualizarUsuarioConProyecto(idProyecto:string, idUsuario:string){
    let foo:any = (elArray:any) => elArray._id == idUsuario
    let indexDelUsuaruio:number = this.miembrosInfo.findIndex(foo)
    if(this.miembrosInfo[indexDelUsuaruio].misProyectos.indexOf(idProyecto) == -1){
      this.miembrosInfo[indexDelUsuaruio].misProyectos.push(idProyecto)
      let post = {
        hots:this.peticion.urllocal,
        path:"Usuarios/Actualizar",
        payload:{
          id:idUsuario,
          misProyectos:this.miembrosInfo[indexDelUsuaruio].misProyectos
        }
      }
      this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
        if(res.state == false){
          this.msg.Load(res.mensaje, "danger", 5000)
        } else {
          this.msg.Load(res.mensaje, "success", 5000)
        }
      })
    }
    this.countProyectoEnUsuariosIsOk++
    if(this.countProyectoEnUsuariosIsOk == this.miembros.length){
      this.ProyectoEnUsuariosIsOk = true
    }
    if(this.ProyectoIsOk == true && this.TareaIsOk == true && this.TareasEnUsuariosIsOk == true && this.ProyectoEnUsuariosIsOk == true && this.EliminadosIsOk == true){
      this.route.navigate([`proyectos/${this.idProyecto}`])
    }
  }

  ActualizarLosEliminados(idUsuario:string){
    let foo:any = (elArray:any) => elArray._id == idUsuario
    let indexDelUsuaruio:number = this.eliminadosInfo.findIndex(foo)
    if(this.eliminadosInfo[indexDelUsuaruio].misProyectos.indexOf(this.idProyecto) !== -1){
      let indexDelProyecto = this.eliminadosInfo[indexDelUsuaruio].misProyectos.indexOf(this.idProyecto)
      this.eliminadosInfo[indexDelUsuaruio].misProyectos.splice(indexDelProyecto,1)
    }
    this.tareas.map( (tareaIdEnTareas:any) => {
      this.eliminadosInfo[indexDelUsuaruio].misTareas.map( (tareaIdEnUsuario:any) => {
        if(tareaIdEnTareas == tareaIdEnUsuario){
          if(this.eliminadosInfo[indexDelUsuaruio].misTareas.indexOf(tareaIdEnTareas) !== -1){
            let indexDeLaTarea = this.eliminadosInfo[indexDelUsuaruio].misTareas.indexOf(tareaIdEnTareas)
            this.eliminadosInfo[indexDelUsuaruio].misTareas.splice(indexDeLaTarea,1)
          }
        }
      })
    })
    let post = {
      hots:this.peticion.urllocal,
      path:"Usuarios/Actualizar",
      payload:{
        id:idUsuario,
        misTareas:this.eliminadosInfo[indexDelUsuaruio].misTareas,
        misProyectos:this.eliminadosInfo[indexDelUsuaruio].misProyectos
      }
    }
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      }
    })
    this.countEliminadosIsOk++
    if(this.countEliminadosIsOk == this.miembrosEliminados.length){
      this.EliminadosIsOk = true
    }
    if(this.ProyectoIsOk == true && this.TareaIsOk == true && this.TareasEnUsuariosIsOk == true && this.ProyectoEnUsuariosIsOk == true && this.EliminadosIsOk == true){
      this.route.navigate([`proyectos/${this.idProyecto}`])
    }
  }
}
