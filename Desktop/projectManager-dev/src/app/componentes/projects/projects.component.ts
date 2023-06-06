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
  proyectos:any[] = []

  ngOnInit():void {
    this.tareaModal = new window.bootstrap.Modal(
      document.getElementById('tareaModal')
    );
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
      console.log(res)
      this.proyectos=res?.datos
      console.log(this.proyectos)
    })
  }

}
