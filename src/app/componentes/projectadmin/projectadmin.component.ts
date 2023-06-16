import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';

declare var window: any;
@Component({
  selector: 'app-projectadmin',
  templateUrl: './projectadmin.component.html',
  styleUrls: ['./projectadmin.component.scss']
})

export class ProjectadminComponent implements OnInit {

  constructor(private peticion:PeticionUsuariosService, private msg:MensajesService){}
  
  modal:any
  id:string = ""
  proyectos:any[] = []
  nombreProyecto:string = ""
  modalEliminar:any


  ngOnInit():void {
    this.CargarTodosProyectos();
    
    this.modalEliminar = new window.bootstrap.Modal(
      document.getElementById('liminarModal')
      );
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
        if(conModal == true){
          
        }
      
    }
  })
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
        id:id
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
