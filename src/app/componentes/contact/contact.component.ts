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
      // console.log("segunda validacion:  ", this.idUsuario);
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
    // if(this.idUsuario){
    //   console.log("idUsuario is OK =>", this.idUsuario)
    //   console.log(post.payload)
    //   console.log(typeof(post.payload))
    // } else {
    //   console.log("idUsuario is NOOOOOOT OK !!!")
    //   console.log(post.payload)
    //   console.log(typeof(post.payload))
    // }

    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      console.log(res)
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.msg.Load(res.mensaje, "success", 5000)
      }
    })
  }

}
