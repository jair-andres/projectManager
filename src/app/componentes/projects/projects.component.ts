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

  tareaModal:any
  id:string = ""
  proyectos:any[] = []

  ngOnInit():void {
    this.tareaModal = new window.bootstrap.Modal(
      document.getElementById('tareaModal')
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
        idUser:idUser
      }
    }
    this.peticion.Post(post.host + post.path, post.payload).then((res:any) => { 
      
      this.proyectos=res?.datos[0].misProyectosinfo
      console.log("misproyectos",this.proyectos);
      
    })
  }


}
