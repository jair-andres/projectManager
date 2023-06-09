import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';

@Component({
  selector: 'app-proyectos-datalle',
  templateUrl: './proyectos-datalle.component.html',
  styleUrls: ['./proyectos-datalle.component.scss']
})
export class ProyectosDatalleComponent implements OnInit {

  constructor(
    private peticion:PeticionUsuariosService,
    private msg:MensajesService,
    private activateRoute:ActivatedRoute
  ) {

  }
  idProyectos:any = ""
  detalleProyecto:String = ""
  ngOnInit():void {
    this.idProyectoGet()
    this.detalleProducto()
  }
  idProyectoGet() {
    this.idProyectos = this.activateRoute.snapshot.paramMap.get('idProyecto')
    console.log(this.idProyectos);
  }

  // Post -> Info del proyecto con actividades y miembros
  detalleProducto() {
    let post = {
      host:this.peticion.urllocal,
      path:"Proyectos/detalleProyecto",
      payload:{
        idProyect:this.idProyectos
      }
    }
    this.peticion.Post(post.host + post.path, post.payload).then((res:any) => {
      this.detalleProyecto=res?.datos
      console.log("Cargar detalle proyecto",this.detalleProyecto)
    })
  }
  // Crear -> Proyecto -> reenviar
  // Editar tareas
  // Editar miembros

}
