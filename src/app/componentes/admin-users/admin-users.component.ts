import { Component } from '@angular/core';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent {

  constructor(private peticion:PeticionUsuariosService) {}

  users:any[] = []

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
}
