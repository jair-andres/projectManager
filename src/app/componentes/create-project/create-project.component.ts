import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit{

  constructor(private peticion:PeticionUsuariosService, private msg:MensajesService, private route:Router){}

  id:string = ""
  nombre:string = ""
  email:string = ""
  //
  nombreProyecto:string = ""
  descripcionProyecto:string = ""
  objetivoProyecto:string = ""
  fechaEntregaProyecto:string = ""
  prosupuesto:any

  miembros:any[] = []
  tareas:any[] = []

  misProyectos:any[] = []
  
  ngOnInit(){
    this.miData()
  }

  miData(){
    let post = {
      hots:this.peticion.urllocal,
      path:"miData",
      payload:{}
    }
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      // console.log("RES :",res)
      this.id = res.id
      this.nombre = res.nombre
      this.email = res.email
      let yo = { 
        id:this.id,
        nombre:this.nombre,
        email:this.email
      }
      this.miembros.push(yo)
    })
    
  }

  GuardarProyecto(){
    let temporalArray:any[] = []

    this.miembros.map( miembro => temporalArray.push(miembro.id))

    let post = {
      hots:this.peticion.urllocal,
      path:"Proyectos/Guardar",
      payload:{
        nombreProyecto: this.nombreProyecto,
        descripcion: this.descripcionProyecto,
        objetivo: this.objetivoProyecto,
        fechaEntrega: this.fechaEntregaProyecto,
        prosupuesto:this.prosupuesto,
        miembros:temporalArray
      }
    }

    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      // console.log("--- res ---")
      // console.log(res)
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.msg.Load(res.mensaje, "success", 5000)
        this.nombreProyecto = ""
        this.descripcionProyecto = ""
        this.objetivoProyecto = ""
        this.fechaEntregaProyecto = ""
        this.prosupuesto = null
        this.miembros = []
        temporalArray.map( userId => this.EditarMisProyectos(res.id, userId))
      }
    })
  }

  EditarMisProyectos(idProyecto:string, idMiembro:string){
    let post = {
      hots:this.peticion.urllocal,
      path:"Usuarios/CargarId",
      payload:{
        id:idMiembro
      }
    }
    
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        // res.datos[0].misProyectos ? this.misProyectos = res?.datos[0]?.misProyectos : this.misProyectos = []
        this.misProyectos = res?.datos[0]?.misProyectos
        this.ActualizarProyectosDeLosUsuarios(idProyecto, idMiembro)
      }
    })
  }

  ActualizarProyectosDeLosUsuarios(idProyecto:string, idMiembro:string){
    //console.log(`Voy añadir este id : ${idProyecto} en el array misProyectos de este usuario : ${idMiembro}`)
    this.misProyectos.push(idProyecto)
    
    let post = {
      hots:this.peticion.urllocal,
      path:"Usuarios/Actualizar",
      payload:{
        id:idMiembro,
        misProyectos:this.misProyectos
      }
    }

    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      // console.log(res)
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.msg.Load(res.mensaje, "success", 5000)
        this.route.navigate(['dashboard'])
        location.reload()
      }
    })
  }

  ActualizarMiembros(newArrayMembers:any[]){
    this.miembros.push(newArrayMembers[0])
  }

  QuitarMiembros(idMiembro:any, miembros:any[]){
    // console.log("Quitamos este miembro : ",idMiembro)
    // console.log("Miembros : ",miembros)
    let foe:any = (elArray:any) => elArray.id == idMiembro 
    // console.log("indexOf : ", miembros.findIndex(foe))
    let quitarEsteIndex:number = miembros.findIndex(foe)
    // console.log(this.miembros)
    // console.log("Quitamos el miembro con el index : ",quitarEsteIndex)
    let suNombre:string = this.miembros[quitarEsteIndex]?.nombre
    let quitarLo:any = this.miembros.splice(quitarEsteIndex,1)
    // console.log(quitarLo)
    // console.log(this.miembros)
    let mensaje:string = `${suNombre} eliminado con éxito`
    this.msg.Load(mensaje, "success", 5000)
  }

  ActualizarTareas(newArrayTasks:any[]){
    this.tareas.push(newArrayTasks)
  }

  QuitarTareas(indexTarea:any, tareas:any){
    // console.log("Eliminamos la tarea en el index : ",indexTarea)
    let quitarLa:any = this.tareas.splice(indexTarea,1)
    let mensaje:string = `Tarea eliminado con éxito`
    this.msg.Load(mensaje, "success", 5000)
  }

  consoleMiembros(){
    console.log(this.miembros)
  }
}
