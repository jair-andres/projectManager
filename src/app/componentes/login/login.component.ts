import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private peticion:PeticionUsuariosService,
    private msg:MensajesService,
    private route:Router
  ){}

  email:string = ""
  password:string = ""

  Login(){
    // console.log(login)
    console.log(this.email)
    console.log(this.password)

    let post = {
      hots:this.peticion.urllocal,
      path:"Usuarios/Login",
      payload:{
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
        if (res.rol == "administrador") {
          this.route.navigate(['adminuser'])
        }else {
          this.route.navigate(['dashboard'])
        }
      }
    })
  }
}
