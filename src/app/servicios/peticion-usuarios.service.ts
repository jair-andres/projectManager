import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajesService } from './mensajes.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PeticionUsuariosService {

  constructor(
    private http:HttpClient,
    private msg: MensajesService,
    private route: Router)
  { }

  urllocal:string = "http://localhost:3000/"

  Post(url:string, data:{}) {
    let promise = new Promise((resolve, reject) => {

      this.http.post(url, data)
      .toPromise()
      .then((res:any) => {
        console.log(res);
        if (res.error == true) {
          this.msg.Load(res.mensaje, "danger", 10000)
          this.route.navigate(['home'])
        }
        resolve(res)
      })
    })

    return promise

  }

  Get(url:string, data:{}) {
    let promise = new Promise((resolve, reject) => {

      this.http.get(url, data)
      .toPromise()
      .then((res:any) => {
        if (res.error == true) {
          this.msg.Load(res.mensaje, "danger", 10000)
          this.route.navigate(['home'])
        }
        resolve(res)
      })
    })

    return promise
  }
}
