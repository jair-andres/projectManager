import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';

@Component({
  selector: 'app-projectadmin',
  templateUrl: './projectadmin.component.html',
  styleUrls: ['./projectadmin.component.scss']
})

export class ProjectadminComponent implements OnInit {

  constructor(private peticion:PeticionUsuariosService, private msg:MensajesService){}

  proyectos:any[] = []

  ngOnInit():void {
    this.CargarTodosProyectos() 
  }
    

  CargarTodosProyectos() {
    let post = {
      host:this.peticion.urllocal,
      path:"Proyectos/CargarTodas",
      payload:{

      }
    }
    this.peticion.Post(post.host + post.path, post.payload).then((res:any) => { 
      this.proyectos=res?.datos
      console.log("todoslosproyectos",this.proyectos);
    })
  }
}
