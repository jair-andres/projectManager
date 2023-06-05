import { Component } from '@angular/core';

import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';

@Component({
  selector: 'app-test-session',
  templateUrl: './test-session.component.html',
  styleUrls: ['./test-session.component.scss']
})
export class TestSessionComponent {

  constructor(
    private peticion:PeticionUsuariosService,
    private msg:MensajesService,
  ){}

  testSession(){
    let post = {
      hots:this.peticion.urllocal,
      path:"state",
      payload:{}
    }

    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        console.log(res)
        this.msg.Load(res.mensaje, "success", 5000)
      }
    })
  }
}
