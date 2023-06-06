import { Component } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private peticion:PeticionUsuariosService, private msg:MensajesService){}

  nombre:string = ""
  email:string = ""
  password:string = ""

  nombreValidate:string = ""
  emailValidate:string = ""
  passwordValidate:string = ""

  Guardar(){
    let post = {
      hots:this.peticion.urllocal,
      path:"Usuarios/Guardar",
      payload:{
        nombre:this.nombre,
        email:this.email,
        password:this.password
      }
    }

    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {

      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
        switch (res.mensaje) {
          case 'El campo nombre es obligatorio':
            this.nombreValidate = "is-invalid",
            this.emailValidate = "is-invalid",
            this.passwordValidate = "is-invalid"
            break;
          case 'El campo email es obligatorio':
            this.nombreValidate = "is-valid"
            this.emailValidate = "is-invalid"
            this.passwordValidate = "is-invalid"
            break;
          case 'Formato del correo inválido':
            this.nombreValidate = "is-valid"
            this.emailValidate = "is-invalid"
            this.passwordValidate = "is-invalid"
            break;
          case 'El campo password es obligatorio':
            this.nombreValidate = "is-valid"
            this.emailValidate = "is-valid"
            this.passwordValidate = "is-invalid"
            break;
          case 'El registro no se pudo almacenar, el email o usuario ya esta en uso':
            this.nombreValidate = "is-valid"
            this.emailValidate = "is-invalid"
            this.passwordValidate = "is-invalid"
            break;
          default:
            break;
        }
      } else {
        this.msg.Load(res.mensaje, "success", 5000)
        this.nombreValidate = "in-valid"
        this.emailValidate = "in-valid"
        this.passwordValidate = "in-valid"
      }
    })
  }
}
