import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private peticion:PeticionUsuariosService, private msg:MensajesService){}

  id:string = ""
  nombre:string = ""
  email:string = ""
  password:string = ""
  
  ngOnInit():void {
    this.miData()
    
  }

  miData(){
    let post = {
      hots:this.peticion.urllocal,
      path:"miData",
      payload:{}
    }

    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      console.log("RES :",res)
      this.id = res.id
      this.nombre = res.nombre
      this.email = res.email
      this.password = res.password
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
      }
    })
    this.EditarId(this.id)
    location.reload()
  }

  EditarId(id:string){
    console.log(id)
    this.id = id

    let post = {
      hots:this.peticion.urllocal,
      path:"Usuarios/CargarId",
      payload:{
        id:this.id
      }
    }

    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      console.log(res)
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.nombre = res?.datos[0].nombre
        this.email = res?.datos[0].email
        this.password = res?.datos[0].password
      }
    })
  }
}
