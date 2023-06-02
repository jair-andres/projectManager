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
[x: string]: any;
  constructor(
    private peticion:PeticionUsuariosService,
    private msg:MensajesService,
    private route:Router
  ){}

  email:string = ""
  password:string = ""

  emailValidate:string = ""
  passwordValidate:string = ""

  Login(){
    let post = {
      hots:this.peticion.urllocal,
      path:"Usuarios/Login",
      payload:{
        email:this.email,
        password:this.password
      }
    }

    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {

      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
        switch (res.mensaje) {
          case 'El campo email y password es obligatorio':
            this.emailValidate = "is-invalid"
            this.passwordValidate = "is-invalid"
            break;
          case 'El campo email es obligatorio':
            this.emailValidate = "is-invalid"
            this.passwordValidate = "is-invalid"
            break;
          case 'Formato del correo inválido':
            this.emailValidate = "is-invalid"
            this.passwordValidate = "is-invalid"
            break;
          case 'El campo password es obligatorio':
            this.emailValidate = "is-valid"
            this.passwordValidate = "is-invalid"
            break;
          default:

            break;
        }
      } else {
        this.msg.Load(res.mensaje, "success", 5000)
        this.emailValidate = "in-valid"
        this.passwordValidate = "in-valid"
        if (res.rol == "Administrador") {
          this.route.navigate(['adminuser'])
        }else {
          this.route.navigate(['dashboard'])
        }
      }
    })
  }
}
