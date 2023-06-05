import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, inject } from '@angular/core';
import { MensajesService } from './mensajes.service';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { PeticionUsuariosService } from './peticion-usuarios.service';
import { Observable, Observer } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GuardiaAutenticacionService {

  constructor(
    private peticion:PeticionUsuariosService,
    private route: Router)
  { 
    console.log("GuardiaAutenticacionService is used")
    this.miData()
  }

  rolSesion:string = ""
  res:object = {}

  miData() {
    console.log("miData is used")
    let post = {
      hots:this.peticion.urllocal,
      path:"miData",
      payload:{}
    }

    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      console.log("res dentro de la peticion : ",res)
      this.res = res
      this.rolSesion = res.rol
      console.log(this.res)
      console.log(this.rolSesion)
    })
  }

  secuenciaSuscriptor(){
    async (params:{}) => {
      try{
        let post = {
          hots:this.peticion.urllocal,
          path:"miData",
          payload:{}
        }
    
        await this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
          console.log("res dentro de la peticion : ",res)
          this.res = res
          this.rolSesion = res.rol
          console.log(this.res)
          console.log(this.rolSesion)
        })
      } catch {

      }
    }
  }

  secuencia = new Observable(this.secuenciaSuscriptor)

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|UrlTree|Promise<any> {
    console.log("canActivate is used")
    console.log(typeof(this.rolSesion))
    if(this.rolSesion == undefined || this.rolSesion == null || this.rolSesion.trim()== ''){
      console.log("this.rolSesion hasta ahora vale :",this.rolSesion)
      return this.route.navigate(['login'])
    } else {
      console.log("this.rolSesion hasta ahora vale :",this.rolSesion)
      return true
    }
  }

}

export const GuardAut: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(GuardiaAutenticacionService).canActivate(next, state);
}
