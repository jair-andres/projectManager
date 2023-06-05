import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';

declare var window: any;

@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrls: ['./pqrs.component.scss']
})
export class PqrsComponent implements OnInit {
  constructor(private peticion:PeticionUsuariosService, private msg:MensajesService){}

  pqrsModal:any
  pqrs:any[] = []
  idPqrs:string = ""
  idUsuarioPqrs:string = ""
  nombrePqrs:string = ""
  emailPqrs:string = ""
  asuntoPqrs:string = ""
  observacionPqrs:string = ""
  estadoPqrs:string = ""


  ngOnInit():void {
    this.pqrsModal = new window.bootstrap.Modal(
      document.getElementById('pqrsModal')
    );
    this.CargarTodasPqrs()
  }

  CargarTodasPqrs(){
    let post = {
      host:this.peticion.urllocal,
      path:"Pqrs/CargarTodas",
      payload:{

      }
    }
    this.peticion.Post(post.host + post.path, post.payload).then((res:any) => { 
      console.log(res)
      this.pqrs=res?.datos
      console.log("##___this.pqrs___##")
      console.log(this.pqrs)
    }) 
  }

  EditarIdPqrs(id:string){
    console.log(id)
    this.idPqrs = id

    let post = {
      hots:this.peticion.urllocal,
      path:"Pqrs/CargarId",
      payload:{
        id:this.idPqrs
      }
    }

    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      console.log(res)
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        res?.datos[0].idUsuario ? this.idUsuarioPqrs = res?.datos[0].idUsuario : undefined
        this.nombrePqrs = res?.datos[0].nombre
        this.emailPqrs = res?.datos[0].email
        this.asuntoPqrs = res?.datos[0].asunto
        this.observacionPqrs = res?.datos[0].observacion
        this.estadoPqrs = res?.datos[0].estado
        this.pqrsModal.show();
      }
    })
  }

  ActualizarPqrs(){
    let post = {
      hots:this.peticion.urllocal,
      path:"Pqrs/Actualizar",
      payload:{
        id:this.idPqrs,
        idUsuario:this.idUsuarioPqrs,
        nombre:this.nombrePqrs,
        email:this.emailPqrs,
        asunto:this.asuntoPqrs,
        observacion:this.observacionPqrs,
        estado:this.estadoPqrs,
      }
    }

    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      console.log(res)
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.msg.Load(res.mensaje, "success", 5000)
        this.CargarTodasPqrs()
        this.pqrsModal.toggle();
        this.idPqrs = ""
        this.idUsuarioPqrs = ""
        this.nombrePqrs = ""
        this.emailPqrs = ""
        this.asuntoPqrs = ""
        this.observacionPqrs = ""
        this.estadoPqrs = ""
      }
    })
  }
}
