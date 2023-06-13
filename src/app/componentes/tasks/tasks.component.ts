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
  tareas:any[] =[]

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
    this.miData()
  }
  miData(){
    let post = {
      hots:this.peticion.urllocal,
      path:"miData",
      payload:{}
    }
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      this.CargarTodasMisTareas(res.id)
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
      console.log("Mis tareas :",this.tareas);
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
  EditarUnaTarea(idTarea:string){
    let post = {
      host:this.peticion.urllocal,
      path:"Tareas/CargarId",
      payload:{
        id:idTarea
      }
    }
    this.peticion.Post(post.host + post.path, post.payload).then((res:any) => {
      this.unaTarea=res?.datos[0]
      console.log("Una tarea :",this.unaTarea);
      this.titulo = res?.datos[0].titulo
      this.descripcion = res?.datos[0].descripcion
      this.fechaInicio = res?.datos[0].fechaInicio
      this.fechaFinal = res?.datos[0].fechaFinal
      this.keyProyecto = res?.datos[0].keyProyecto
      this.keyEncargado = res?.datos[0].keyEncargado
      this.comentarios = res?.datos[0].comentarios
      this.estado = res?.datos[0].estado
      this.leerTareaModal.show();
    })
  }

  ActualizarTarea(){
    console.log("this.tareas : ",this.tareas)

    console.log("this.idTarea : ",this.idTarea)
    console.log("this.unaTarea : ",this.unaTarea)

    console.log("this.titulo : ",this.titulo)
    console.log("this.descripcion : ",this.descripcion)
    console.log("this.fechaInicio : ",this.fechaInicio)
    console.log("this.fechaFinal : ",this.fechaFinal)
    console.log("this.keyProyecto : ",this.keyProyecto)
    console.log("this.keyEncargado : ",this.keyEncargado)
    console.log("this.actividades : ",this.actividades)
    console.log("this.comentarios : ",this.comentarios)
    console.log("this.estado : ",this.estado)

    console.log("this.nuevoComentario : ",this.nuevoComentario)
  }
}
