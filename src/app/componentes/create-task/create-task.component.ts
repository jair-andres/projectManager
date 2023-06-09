import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';
import { MensajesService } from 'src/app/servicios/mensajes.service';

declare var window: any; 
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit{
  @Input() tareas: any;
  @Output() resultBis = new EventEmitter<any>();

  tareaModal:any
  busquedaEncargado:string = ""
  resultadoBusquedaEncargado:any[] = []
  encargadoSelectionado:any[] = []

  tituloTarea:string =""
  descripcionTarea:string =""
  duracionTarea:string =""
  fechaTarea:string =""
  
  constructor(private peticion:PeticionUsuariosService, private msg:MensajesService){}

  ngOnInit(){
    this.tareaModal = new window.bootstrap.Modal(
      document.getElementById('tareaModal')
    );
  }

  buscarEncargado(){
    let post = {
      hots:this.peticion.urllocal,
      path:"Usuarios/Buscar",
      payload:{
        foo:this.busquedaEncargado
      }
    }
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      // console.log(res)
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.resultadoBusquedaEncargado = res?.datos
      }
    })
  }

  crearTarea(){
    let encargadoTemporal = {
      id: this.resultadoBusquedaEncargado[0]._id,
      nombre: this.resultadoBusquedaEncargado[0].nombre,
      email: this.resultadoBusquedaEncargado[0].email
    }
    this.encargadoSelectionado.push(encargadoTemporal)
    // console.log(this.encargadoSelectionado)
    let tarea = {
      encargado:this.encargadoSelectionado[0],
      tituloTarea:this.tituloTarea,
      descripcionTarea:this.descripcionTarea,
      duracionTarea:this.duracionTarea,
      fechaTarea:this.fechaTarea
    }
    // console.log(tarea)
    this.resultBis.emit(tarea)
    this.tareaModal.toggle()
    this.busquedaEncargado = ""
    this.resultadoBusquedaEncargado = []
    this.encargadoSelectionado = []
    this.tituloTarea =""
    this.descripcionTarea =""
    this.duracionTarea =""
    this.fechaTarea =""
  }
}
