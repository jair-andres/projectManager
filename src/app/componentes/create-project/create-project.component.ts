import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent {
  constructor(private peticion:PeticionUsuariosService, private msg:MensajesService, private route:Router){}

  nombreProyecto:string = ""
  descripcionProyecto:string = ""
  objetivoProyecto:string = ""
  fechaEntregaProyecto:string = ""
  prosupuesto:any
  miembros:any[] = []

  toto:string = ""
  busqueda:string =""
  resultadoDeBusqueda:string[] = []



  GuardarProyecto(){
    let post = {
      hots:this.peticion.urllocal,
      path:"Proyectos/Guardar",
      payload:{
        nombreProyecto: this.nombreProyecto,
        descripcion: this.descripcionProyecto,
        objetivo: this.objetivoProyecto,
        fechaEntrega: this.fechaEntregaProyecto,
        prosupuesto:this.prosupuesto
      }
    }

    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.msg.Load(res.mensaje, "success", 5000)
        this.nombreProyecto = ""
        this.descripcionProyecto = ""
        this.objetivoProyecto = ""
        this.fechaEntregaProyecto = ""
        this.prosupuesto = null
        this.route.navigate(['dashboard'])
        location.reload()
      }
    })
  }


  ActualizarMiembros(newArrayMembers:string[]){
    this.miembros.push(newArrayMembers[0])
  }

  consoleMiembros(){
    console.log(this.miembros)
  }
}
