import { Component } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  constructor(private peticion:PeticionUsuariosService, private msg:MensajesService){}

  email:string = ""
  nombre:string = ""
  
  GuardarNewsletters(){
    let post = {
      hots:this.peticion.urllocal,
      path:"Newsletters/Guardar",
      payload:{
        email:this.email,
        nombre:this.nombre,
      }
    }
  
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.msg.Load(res.mensaje, "success", 5000)
        this.email = ""
        this.nombre = ""
      }
    })
  }
}
