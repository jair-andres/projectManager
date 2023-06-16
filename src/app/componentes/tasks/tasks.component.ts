import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';

declare var window: any;
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  leerTareaModal:any
  eliminarTareaModal:any
  tareas:any[] =[]

  miId:string =""
  miAlias:string =""
  misTareasUsuario:any[] = []
  tareasDelProyecto:any[] = []

  idCreador:string =""

  idTarea:string =""
  unaTarea:any[] = []

  titulo:string =""
  descripcion:string =""
  fechaInicio:string =""
  fechaFinal:string =""
  keyProyecto:string =""
  keyEncargado:string =""
  actividades:any[] =[]
  comentarios:any[] =[]
  estado:string =""

  nuevoComentario:string =""


  constructor(private peticion:PeticionUsuariosService, private msg:MensajesService){}

  ngOnInit():void {
    this.leerTareaModal = new window.bootstrap.Modal(
      document.getElementById('leerTareaModal')
    );
    this.eliminarTareaModal = new window.bootstrap.Modal(
      document.getElementById('eliminarTareaModal')
    );
    this.miData()
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
      this.CargarTodasMisTareas(res.id)
    })
  }
  QuienEsElCreadorDelProyecto(idProyecto:string){
    let post = {
      host:this.peticion.urllocal,
      path:"Proyectos/CargarId",
      payload:{
        id:idProyecto
      }
    }
    this.peticion.Post(post.host + post.path, post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.idCreador = res?.datos[0].keyUser
        this.tareasDelProyecto = res?.datos[0].tareas
      }
    })

  }
  CargarTodasMisTareas(idUser:string) {
    let post = {
      host:this.peticion.urllocal,
      path:"Usuarios/CargarTodasMisTareas",
      payload:{
        idUser:idUser
      }
    }
    this.peticion.Post(post.host + post.path, post.payload).then((res:any) => {
      this.tareas=res?.datos[0].misTareasinfo
      this.misTareasUsuario=res?.datos[0].misTareas
      console.log("Mis tareas :",this.tareas);
      console.log("DATAS => ",res?.datos[0])
      console.log("misTareas => ",this.misTareasUsuario)
    })
  }
  CortarPalabra(palabra:string, tamano:number){
    if (palabra.length > tamano) {
      if (tamano <= 3) {
          return palabra.slice(0, tamano - 3) + "..."
      }
      else {
          return palabra.slice(0, tamano) + "..."
      }
    } else {
      return palabra
    }
  }
  EditarUnaTarea(idTarea:string,conModal:boolean){
    let post = {
      host:this.peticion.urllocal,
      path:"Tareas/CargarId",
      payload:{
        id:idTarea
      }
    }
    this.peticion.Post(post.host + post.path, post.payload).then((res:any) => {
      this.unaTarea=res?.datos[0]
      this.idTarea = res?.datos[0]._id
      this.titulo = res?.datos[0].titulo
      this.descripcion = res?.datos[0].descripcion
      this.fechaInicio = res?.datos[0].fechaInicio
      this.fechaFinal = res?.datos[0].fechaFinal
      this.keyProyecto = res?.datos[0].keyProyecto
      this.keyEncargado = res?.datos[0].keyEncargado
      this.actividades = res?.datos[0].actividades
      this.comentarios = res?.datos[0].comentarios
      this.estado = res?.datos[0].estado
      this.QuienEsElCreadorDelProyecto(this.keyProyecto)
      if(conModal == true){
        this.leerTareaModal.show();
      }
    })
  }

  ActualizarTarea(){
    if(this.nuevoComentario !== undefined && this.nuevoComentario !== null && this.nuevoComentario !== ""){
      let today = new Date();
      let creoUnNuevoComentario:any = {
        date : today,
        autor : this.miAlias,
        autorId : this.miId,
        comentario : this.nuevoComentario
      }
      if(this.comentarios == undefined){
        this.comentarios = []
        this.comentarios.push(creoUnNuevoComentario)
      } else {
        this.comentarios.push(creoUnNuevoComentario)
      }
    }
    
    let post = {
      hots:this.peticion.urllocal,
      path:"Tareas/Actualizar",
      payload:{
        id:this.idTarea,
        descripcion:this.descripcion,
        fechaInicio:this.fechaInicio,
        fechaFinal:this.fechaFinal,
        actividades:this.actividades,
        comentarios:this.comentarios,
        estado:this.estado,
      }
    }
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.msg.Load(res.mensaje, "success", 5000)
        this.leerTareaModal.toggle();
        location.reload()
      }
    })

  }

  QuieroEliminarEstaTarea(idTarea:string, tituloTarea:string){
    this.EditarUnaTarea(idTarea,false)
    let foo = idTarea
    this.eliminarTareaModal.show(idTarea)
  }

  EliminarEstaTarea(idTarea:string){
    let post = {
      hots:this.peticion.urllocal,
      path:"Tareas/Eliminar",
      payload:{
        id:idTarea
      }
    }
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.msg.Load(res.mensaje, "success", 5000)
        this.eliminarTareaModal.toggle();
        let indexParaMisTareasUsuarios:number = this.misTareasUsuario.indexOf(idTarea)
        this.misTareasUsuario.splice(indexParaMisTareasUsuarios,1)
        let indexParaTareasDelProyecto:number = this.tareasDelProyecto.indexOf(idTarea)
        this.tareasDelProyecto.splice(indexParaTareasDelProyecto,1)
        this.ActualizarMisTareasEnUsuario(this.miId)
        this.ActualizarTareasEnProyecto(this.keyProyecto)
      }
    })
  }

  ActualizarMisTareasEnUsuario(idUsuario:string){
    let post = {
      hots:this.peticion.urllocal,
      path:"Usuarios/Actualizar",
      payload:{
        id:idUsuario,
        misTareas:this.misTareasUsuario
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

  ActualizarTareasEnProyecto(idProyecto:string){
    let post = {
      hots:this.peticion.urllocal,
      path:"Proyectos/Actualizar",
      payload:{
        id:idProyecto,
        tareas:this.tareasDelProyecto
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
}
