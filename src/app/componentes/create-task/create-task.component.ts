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

  actividadesContainer:any
  tareaModal:any
  busquedaEncargado:string = ""
  resultadoBusquedaEncargado:any[] = []
  encargadoSelectionado:any[] = []

  tituloTarea:string =""
  descripcionTarea:string =""
  fechaInicioTarea:string =""
  fechaEntregaTarea:string =""
  actividades:any = []

  hayActividades:boolean = false
  
  constructor(private peticion:PeticionUsuariosService, private msg:MensajesService){}

  ngOnInit(){
    this.tareaModal = new window.bootstrap.Modal(
      document.getElementById('tareaModal')
    );
    this.actividadesContainer = window.document.getElementById("actividadesContainer")
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

  consoleActividades(){
    console.log(this.actividades)
  }
  crearActividades(){
    this.hayActividades = true
    let idTempo:string = this.actividades.length
    this.actividades.push(
      {id: idTempo,
      actividad: "",
      finalisada:false}
    )
  }
  quitarActividad(indexActividad:any){
    // console.log("ID => ",indexActividad)
    let quitarActo:any = this.actividades.splice(indexActividad,1)
    let mensaje:string = "Actividad elmininada con  éxito"
    this.msg.Load(mensaje, "success", 5000)
    if(this.actividades.length == 0){
      this.hayActividades = false
    }
  }

  crearTarea(){
    let encargadoTemporal = {
      id: this.resultadoBusquedaEncargado[0]._id,
      nombre: this.resultadoBusquedaEncargado[0].nombre,
      email: this.resultadoBusquedaEncargado[0].email
    }
    this.encargadoSelectionado.push(encargadoTemporal)
    let tarea = {
      titulo:this.tituloTarea,
      descripcion:this.descripcionTarea,
      fechaInicio:this.fechaInicioTarea,
      fechaFinal:this.fechaEntregaTarea,
      actividades:this.actividades,
      miembros:this.encargadoSelectionado[0],
      keyEncargado:this.encargadoSelectionado[0].id
    }
    this.resultBis.emit(tarea)
    this.tareaModal.toggle()
    this.busquedaEncargado = ""
    this.resultadoBusquedaEncargado = []
    this.encargadoSelectionado = []
    this.tituloTarea =""
    this.descripcionTarea =""
    this.fechaEntregaTarea =""
    this.fechaInicioTarea =""
    this.actividades = []
    this.hayActividades = false
  }
}
