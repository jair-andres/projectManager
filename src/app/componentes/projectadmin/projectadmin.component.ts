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
  id:string = ""

  ngOnInit():void {
    this.CargarTodosProyectos();
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

  Eliminar(id:string){
    this.id = id
    console.log(id)


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
        this.CargarTodosProyectos()
      }
    })
  }
}
