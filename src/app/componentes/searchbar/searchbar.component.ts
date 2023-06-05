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

  leerOnChange(){
    
    let post = {
      hots:this.peticion.urllocal,
      path:"Usuarios/Buscar",
      payload:{
        foo:this.busqueda
      }
    }
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      // console.log(res)
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.resultadoBusqueda = res?.datos
        // this.resultadoDeBusqueda = res?.datos
      }
    })
  }

  anadir(){
    console.log(this.resultadoBusqueda)
    this.usuarioSelectionado = this.resultadoBusqueda
    this.resultadoBusqueda = []
    this.busqueda = ""
    this.miembrosModal.toggle()
    this.result.emit(this.usuarioSelectionado);
  }

}
