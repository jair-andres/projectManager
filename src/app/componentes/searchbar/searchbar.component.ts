import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';
import { MensajesService } from 'src/app/servicios/mensajes.service';

declare var window: any; 

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  @Input() miembros: any;
  // @Input() resultadoDeBusqueda:any = []
  @Output() result = new EventEmitter<any>();

  miembrosModal:any
  busqueda:string = ""
  resultadoBusqueda:any[] = []
  usuarioSelectionado:any[] = []


  constructor(private peticion:PeticionUsuariosService, private msg:MensajesService){
    
  }
  ngOnInit() {
    this.miembrosModal = new window.bootstrap.Modal(
      document.getElementById('miembrosModal')
    );
    console.log("Miembros :", this.miembros)
  }

  consoleMiembros(){
    console.log("Miembros :", this.miembros)
  }
  
  leerOnChange(){
    let post = {
      hots:this.peticion.urllocal,
      path:"Usuarios/Buscar",
      payload:{
        foo:this.busqueda
      }
    }
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.resultadoBusqueda = res?.datos
      }
    })
  }

  anadir(){
    let temporalData = {
      id: this.resultadoBusqueda[0]._id,
      alias: this.resultadoBusqueda[0].alias,
      email: this.resultadoBusqueda[0].email
    }
    this.usuarioSelectionado.push(temporalData)

    let localMiembros: any[] = this.miembros
    console.log("LocalMiembros => ",localMiembros)
    let yaEsta = false

    localMiembros.map( miembro => {
      if(miembro.id == this.usuarioSelectionado[0]?.id || miembro ==this.usuarioSelectionado[0]?.id){
        yaEsta = true
      }
    })
    if(yaEsta){
      let mensaje = "Este usuario ya esta miembros del proyecto"
      this.msg.Load(mensaje, "danger", 5000)
    } else {
      let mensaje = "Usuario añadido al proyecto"
      this.msg.Load(mensaje, "success", 5000)
      this.result.emit(this.usuarioSelectionado)
    }
    this.miembrosModal.toggle()
    this.resultadoBusqueda = []
    this.usuarioSelectionado = []
    this.busqueda = ""
  }

}
