import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';
import { SubirArchivosService } from 'src/app/servicios/subir-archivos.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(public peticion:PeticionUsuariosService, private msg:MensajesService, private route:Router, private SubirArchivos:SubirArchivosService){}
  
  destino:string = ""
  path:string = ""
  id:string = ""
  alias:string =""
  nombre:string = ""
  apellido:string =""
  telefono:string =""
  email:string = ""
  password:string = ""

  imageProfileUrl:string = ""
  imagenEstaOk:boolean = false

  
  ngOnInit():void {
    this.destino = this.SubirArchivos.urllocal
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
      this.imageProfileUrl = `${this.peticion.urllocal}back/perfiles/${this.id}.png`
      this.checkIfImageExists(this.imageProfileUrl, (exists:any) => {
        if (exists) {
          this.imagenEstaOk = true
        }
      })
      this.EditarId(res.id)
    })
    
  }

  EditarId(id:string){
    this.path = '/files/back/perfiles/' + id
    let post = {
      hots:this.peticion.urllocal,
      path:"Usuarios/CargarId",
      payload:{
        id:id
      }
    }
    
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.alias = res?.datos[0]?.alias
        this.nombre = res?.datos[0].nombre
        this.apellido = res?.datos[0]?.apellido
        this.telefono = res?.datos[0]?.telefono
        this.email = res?.datos[0].email
        this.password = res?.datos[0].password
        this.apellido = res?.datos[0].apellido
        this.telefono = res?.datos[0].telefono
      }
    })
  }

  checkIfImageExists(urlparam:string, callback:any) {
    const img = new Image();
    img.src = urlparam;
    if (img.complete) {
      callback(true)
    } else {
      img.onload = () => {
        callback(true)
      }
      img.onerror = () => {
        callback(false)
      }
    }
  }

  logOut(){
    let post = {
      hots:this.peticion.urllocal,
      path:"Usuarios/logout",
      payload:{}
    }

    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.msg.Load(res.mensaje, "success", 5000)
        this.route.navigate(['login'])
      }
    })
  }
  
  Actualizar(){
    let post = {
      hots:this.peticion.urllocal,
      path:"Usuarios/Actualizar",
      payload:{
        id:this.id,
        alias:this.alias,
        nombre:this.nombre,
        apellido:this.apellido,
        telefono:this.telefono,
        email:this.email,
        password:this.password
      }
    }
    console.log(this.apellido,this.telefono)
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      console.log(res)
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.msg.Load(res.mensaje, "success", 5000)
        this.logOut()
      }
    })
  }

}