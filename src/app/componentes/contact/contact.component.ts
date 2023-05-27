import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private peticion:PeticionUsuariosService, private msg:MensajesService){}

  imageContact:string="../../../assets/img/contact_image.jpg"

  idUsuario:string = ""
  email:string = ""
  nombre:string = ""
  asunto:string = ""
  observacion:string = ""

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
      this.idUsuario = res.id
      console.log("segunda validacion:" + this.idUsuario);
    })
  }

  GuardarPqrs(){
    let post = {
      hots:this.peticion.urllocal,
      path:"Pqrs/Guardar",
      payload:{
        idUsuario:this.idUsuario,
        email:this.email,
        nombre:this.nombre,
        asunto:this.asunto,
        observacion:this.observacion
      }
    }

    /*let validar = this.idUsuario
    if (this.idUsuario !== undefined || this.idUsuario !== null || this.idUsuario !== "" || validar.trim() == '') {
      console.log(this.idUsuario);
      Object.assign(post.payload, {idUsuario:this.idUsuario})
      console.log("entraa");
      console.log("esta es la lista",post.payload)
    }*/

    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {

      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.msg.Load(res.mensaje, "success", 5000)
      }
    })
  }

}
