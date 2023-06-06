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
  nombre:string = ""
  email:string = ""
  password:string = ""

  
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
/*       console.log("RES :",res)
 */      this.id = res.id
      this.EditarId(res.id)
    })
    
  }

  EditarId(id:string){
   /*  console.log("Usamos EditarId") */

    this.path = '/files/back/perfiles/' + id

    let post = {
      hots:this.peticion.urllocal,
      path:"Usuarios/CargarId",
      payload:{
        id:id
      }
    }
    
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
/*       console.log("res de EditarId =>", res)
 */      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.nombre = res?.datos[0].nombre
        this.email = res?.datos[0].email
        this.password = res?.datos[0].password
      }
    })
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
        nombre:this.nombre,
        email:this.email,
        password:this.password
      }
    }

    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      console.log(res)
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.msg.Load(res.mensaje, "success", 5000)
        // this.logOut()
      }
    })
  }

}