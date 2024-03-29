import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';

declare var window: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  constructor(private peticion:PeticionUsuariosService, private msg:MensajesService){}

  modal:any
  tareaModal:any
  proyectos:any[] = []
  id:string = ""
  nombreProyecto:string = ""
  modalEliminar:any


  ngOnInit():void {
    this.modalEliminar = new window.bootstrap.Modal(
      document.getElementById('eliminarModal')
    )
    this.miData()
  }

  miData(){
    let post = {
      hots:this.peticion.urllocal,
      path:"miData",
      payload:{}
    }
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      this.CargarTodosMisProyectos(res.id)
    })

  }

  CargarTodosMisProyectos(idUser:string) {
    let post = {
      host:this.peticion.urllocal,
      path:"Usuarios/CargarTodosMisProyectos",
      payload:{
        idUser:idUser,
        nombreProyecto: this.nombreProyecto
      }
    }
    this.peticion.Post(post.host + post.path, post.payload).then((res:any) => {
      this.proyectos=res?.datos[0].misProyectosinfo
    })
  }

  EliminarIdConModal(id:string, conModal:boolean){
    this.id = id
    let post = {
      hots:this.peticion.urllocal,
      path:"Proyectos/CargarId",
      payload:{
        id:this.id
      }
    }
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.nombreProyecto = res?.datos[0].nombreProyecto
        
    }
  })
    if(conModal == true){
      this.modal.show();
    }
    
  }

  QuererEliminar(id:string){
    let foo = id
    this.EliminarIdConModal(foo,false)
    this.modalEliminar.show()
  } 

  Eliminar(id:string){
    this.id = id
    let post = {
      host:this.peticion.urllocal,
      path:"Proyectos/Eliminar",
      payload:{
        id:this.id
      }
    }
    this.peticion.Post(post.host + post.path, post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.msg.Load(res.mensaje, "success", 5000)
        this.miData();
      }
    })
  }
  
}
