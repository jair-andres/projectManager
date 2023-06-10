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
  nombreProyecto:string = ""
  modalEliminar:any


  ngOnInit():void {
    this.tareaModal = new window.bootstrap.Modal(
      document.getElementById('tareaModal')
    );
    this.miData();
    /* this.modalEliminar = new window.bootstrap.Modal(
    document.getElementById('eliminarModal')
    ); */
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
      console.log("misproyectos",this.proyectos);
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
