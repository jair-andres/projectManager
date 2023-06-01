import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';


declare var window: any;
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  constructor(private peticion:PeticionUsuariosService, private msg:MensajesService){}

  modal:any;
  id:string = ""
  nombre:string = ""
  email:string = ""
  password:string = ""
  rol:string = "Cliente"
  users:any[] = []
  pqrs:any[] = []
  newsletters:any[] = []

  ngOnInit():void {
    this.modal = new window.bootstrap.Modal(
      document.getElementById('userModal')
    );
    this.CargarTodas()
    this.CargarTodasPqrs()
    this.CargarTodasNewsletter()
  }

  mostrar() {
    let post = {
      host:this.peticion.urllocal,
      path:"Usuarios/CargarTodas",
      payload:{

      }
    }
    this.peticion.Post(post.host + post.path, post.payload).then(
      (res:any) => {
        if(res.state == true) {
          console.log(res);
          for (let index = 0; index < res.datos.length; index++) {
            const element = res.datos[index]['nombre'];
            this.users.push(element)
          }
          console.log("User: "+this.users);
        }
        else {
          console.log(res);
        }
      }
    )
  }

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
      console.log(res)
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.msg.Load(res.mensaje, "success", 5000)
      }
    })
  }

  CargarTodas(){
    let post = {
      host:this.peticion.urllocal,
      path:"Usuarios/CargarTodas",
      payload:{

      }
    }
    this.peticion.Post(post.host + post.path, post.payload).then((res:any) => { 
      console.log(res)
      this.users=res?.datos
      console.log(this.users)
    })
  }

  Actualizar(){
    let post = {
      hots:this.peticion.urllocal,
      path:"Usuarios/Actualizar",
      payload:{
        nombre:this.nombre,
        email:this.email,
        password:this.password,
        rol:this.rol,
        id:this.id
      }
    }

    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      console.log(res)
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.msg.Load(res.mensaje, "success", 5000)
        this.CargarTodas()
        this.modal.toggle();
      }
    })
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
        this.rol = res?.datos[0].rol
      }
    })

    this.modal.show();
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
      console.log(this.pqrs)
    }) 
  }

  CargarTodasNewsletter(){
    let post = {
      host:this.peticion.urllocal,
      path:"Newsletters/CargarTodas",
      payload:{

      }
    }
    this.peticion.Post(post.host + post.path, post.payload).then((res:any) => { 
      console.log(res)
      this.newsletters=res?.datos
      console.log(this.newsletters)
    }) 
  }
}
