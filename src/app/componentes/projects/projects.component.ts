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
<<<<<<< HEAD
  id:string = ""
=======
  nombreProyecto:string = ""
  modalEliminar:any

>>>>>>> cdc6726e05cc139ac837d404f4472a370f7e8ff8

  ngOnInit():void {
    /*this.tareaModal = new window.bootstrap.Modal(
      document.getElementById('tareaModal')
<<<<<<< HEAD
    );*/
    this.CargarTodosProyectos()
    this.miData()
=======
    );
    this.miData();
    /* this.modalEliminar = new window.bootstrap.Modal(
    document.getElementById('eliminarModal')
    ); */
>>>>>>> cdc6726e05cc139ac837d404f4472a370f7e8ff8
  }

  CargarTodosProyectos() {
    let post = {
      host:this.peticion.urllocal,
      path:"Proyectos/CargarTodas",
      payload:{

      }
    }
<<<<<<< HEAD
    this.peticion.Post(post.host + post.path, post.payload).
    then((res:any) => {
      this.proyectos=res?.datos
      console.log("Cargar todos los proyectos",this.proyectos)
    })
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
<<<<<<< HEAD
      console.log("Cargar todos mis proyectos",this.proyectos)
=======
    this.peticion.Post(post.host + post.path, post.payload).then((res:any) => { 
      // console.log(res)
      this.proyectos=res?.datos
      // console.log(this.proyectos)
>>>>>>> dev
=======
      console.log("misproyectos",this.proyectos);
>>>>>>> cdc6726e05cc139ac837d404f4472a370f7e8ff8
    })
  }
/*   QuererEliminar(id:string){
    let foo = id
    this.modalEliminar.show()
    console.log(id);
    
  } */

  Eliminar(id:string){
    this.id = id
    console.log(id)

<<<<<<< HEAD
=======

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
  
  
>>>>>>> cdc6726e05cc139ac837d404f4472a370f7e8ff8
}
