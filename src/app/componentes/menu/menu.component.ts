import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  logo:string="../../../assets/img/projectmanager_logo_vertical.png"

  constructor(
    private peticion:PeticionUsuariosService,
    private msg:MensajesService,
    private route:Router
  ){}

  aliasSesion:string = ""
  rolSesion:string = ""
  res: object ={}
  id:string = ""

  imageProfileUrl:string = ""
  imagenEstaOk:boolean = false

  ngOnInit(): void {
    this.miData()
  }


  miData() {
    let post = {
      hots:this.peticion.urllocal,
      path:"miData",
      payload:{}
    }

    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      this.res = res
      this.id = res.id
      this.aliasSesion = res.alias
      this.rolSesion = res.rol
      this.imageProfileUrl = `${this.peticion.urllocal}back/perfiles/${this.id}.png`
      this.checkIfImageExists(this.imageProfileUrl, (exists:any) => {
        if (exists) {
          // console.log('Image exists. ')
          this.imagenEstaOk = true
        }
      })
    })
    // console.log("=== CONSOLE.LOG DE MENU COMPONENT ===")
    // console.log(this.res)
    // console.log(this.rolSesion)
    // console.log(typeof(this.rolSesion))
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
        this.route.navigate(['home'])
        location.reload()
      }
    })
  }
}
