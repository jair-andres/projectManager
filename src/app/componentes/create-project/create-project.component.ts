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
  alias:string = ""
  email:string = ""
  nombreProyecto:string = ""
  descripcionProyecto:string = ""
  objetivoProyecto:string = ""
  fechaEntregaProyecto:string = ""
  keyUser:string = ""
  prosupuesto:any

  miembros:any[] = []
  miembrosLength:number = this.miembros.length
  tareas:any[] = []
  tareasLength:number = this.tareas.length

  misProyectos:any[] = []
  tareasDeUnUsuario:any[] = []

  idDelProyectoDespuesGuardarLo:string = ""
  tareasDelProyecto:any[] = []

  ProyectoIsOk:boolean = false //done
  TareaIsOk:boolean = false //done
  TareasEnProyectoIsOk:boolean = false //done
  TareasEnUsuariosIsOk:boolean = false //done
  countTareasEnUsuariosIsOk:number = 0 //done
  ProyectoEnUsuariosIsOk:boolean = false //done
  countProyectoEnUsuariosIsOk:number = 0 //done
  

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
      this.id = res.id
      this.alias = res.alias
      this.email = res.email
      let yo = {
        id:this.id,
        alias:this.alias,
        email:this.email
      }
      this.miembros.push(yo)
    })

  }

  GuardarProyecto(){
    let arrayIdMiembros:any[] = []
    this.miembros.map( miembro => arrayIdMiembros.push(miembro.id))

    let post = {
      hots:this.peticion.urllocal,
      path:"Proyectos/Guardar",
      payload:{
        nombreProyecto: this.nombreProyecto,
        descripcion: this.descripcionProyecto,
        objetivo: this.objetivoProyecto,
        fechaEntrega: this.fechaEntregaProyecto,
        prosupuesto:this.prosupuesto,
        miembros:arrayIdMiembros,
        tareas:[],
        keyUser:this.id
      }
    }

    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.ProyectoIsOk = true
        this.idDelProyectoDespuesGuardarLo = res.id
        this.nombreProyecto = ""
        this.descripcionProyecto = ""
        this.objetivoProyecto = ""
        this.fechaEntregaProyecto = ""
        this.prosupuesto = null
        this.tareas.map( tarea => this.RegistrarTarea(this.idDelProyectoDespuesGuardarLo, tarea))
        this.miembros.map( miembro => this.EditarMisProyectos(this.idDelProyectoDespuesGuardarLo, miembro.id))
      }
    })
  }

  RegistrarTarea(idProyecto:string, tarea:any){
    let post = {
      hots:this.peticion.urllocal,
      path:"Tareas/Guardar",
      payload:{
        titulo:tarea.titulo,
        descripcion:tarea.descripcion,
        fechaInicio:tarea.fechaInicio,
        fechaFinal:tarea.fechaFinal,
        actividades:tarea.actividades,
        keyProyecto:idProyecto,
        keyEncargado:tarea.keyEncargado,
        miembros:tarea.miembros
      }
    }
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        let idTempoDeLaTarea = res.id
        this.tareasDelProyecto.push(idTempoDeLaTarea)
        if(this.tareasDelProyecto.length == this.tareas.length){
          this.TareaIsOk = true
          this.ActualizarProyectoConSusTareas(this.idDelProyectoDespuesGuardarLo, this.tareasDelProyecto)
        }
        this.EditarTareasDeUnUsuario(tarea.keyEncargado,idTempoDeLaTarea)
      }
    })
  }

  ActualizarProyectoConSusTareas(idProyecto:string,arrayIdTareas:any){
    let post = {
      hots:this.peticion.urllocal,
      path:"Proyectos/Actualizar",
      payload:{
        id:idProyecto,
        tareas:arrayIdTareas
      }
    }
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.TareasEnProyectoIsOk = true
      }
    })
  }

  EditarTareasDeUnUsuario(idUsuario:string, idTarea:string){
    let post = {
      hots:this.peticion.urllocal,
      path:"Usuarios/CargarId",
      payload:{
        id:idUsuario
      }
    }
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.tareasDeUnUsuario = res?.datos[0]?.misTareas
        this.ActualizarUsuarioConTarea(idUsuario, idTarea)
      }
    })
  }

  ActualizarUsuarioConTarea(idUsuario:string, idTarea:string){
    this.tareasDeUnUsuario.push(idTarea)
    let post = {
      hots:this.peticion.urllocal,
      path:"Usuarios/Actualizar",
      payload:{
        id:idUsuario,
        misTareas:this.tareasDeUnUsuario
      }
    }
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.countTareasEnUsuariosIsOk++
        if(this.countTareasEnUsuariosIsOk == this.miembros.length){
          this.TareasEnUsuariosIsOk = true
        }
        if(this.ProyectoIsOk == true && this.TareaIsOk == true && this.TareasEnProyectoIsOk == true && this.TareasEnUsuariosIsOk == true && this.ProyectoEnUsuariosIsOk == true){
          let msg = "Proyecto guardado con exito"
          this.msg.Load(msg, "success", 5000)
          this.route.navigate(['dashboard'])
          location.reload()
        }
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
        this.misProyectos = res?.datos[0]?.misProyectos
        this.ActualizarProyectosDeLosUsuarios(idProyecto, idMiembro)
      }
    })
  }

  ActualizarProyectosDeLosUsuarios(idProyecto:string, idMiembro:string){
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
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
        this.route.navigate(['dashboard'])
        location.reload()
      } else {
        this.countProyectoEnUsuariosIsOk++
        if(this.countProyectoEnUsuariosIsOk == this.miembros.length){
          this.ProyectoEnUsuariosIsOk = true
        }
        if(this.tareas.length == 0 && this.ProyectoEnUsuariosIsOk == true){
          let msg = "Proyecto guardado con exito"
          this.msg.Load(msg, "success", 5000)
          this.route.navigate(['dashboard'])
          location.reload()
        }
        if(this.ProyectoIsOk == true && this.TareaIsOk == true && this.TareasEnProyectoIsOk == true && this.TareasEnUsuariosIsOk == true && this.ProyectoEnUsuariosIsOk == true){
          let msg = "Proyecto guardado con exito"
          this.msg.Load(msg, "success", 5000)
          this.route.navigate(['dashboard'])
          location.reload()
        }
      }
    })
  }

  ActualizarMiembros(newArrayMembers:any[]){
    this.miembros.push(newArrayMembers[0])
  }

  QuitarMiembros(idMiembro:any, miembros:any[]){
    let foe:any = (elArray:any) => elArray.id == idMiembro
    let quitarEsteIndex:number = miembros.findIndex(foe)
    let suNombre:string = this.miembros[quitarEsteIndex]?.alias
    let quitarLo:any = this.miembros.splice(quitarEsteIndex,1)
    let mensaje:string = `${suNombre} eliminado con éxito`
    this.msg.Load(mensaje, "success", 5000)
  }

  ActualizarTareas(newArrayTasks:any[]){
    this.tareas.push(newArrayTasks)
  }

  QuitarTareas(indexTarea:any, tareas:any){
    let quitarLa:any = this.tareas.splice(indexTarea,1)
    let mensaje:string = `Tarea eliminado con éxito`
    this.msg.Load(mensaje, "success", 5000)
  }
}
