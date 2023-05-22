import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeticionUsuariosService {

  constructor(private hhtp:HttpClient) { }

  urllocal:string = "http://localhost:3000/"

  Post(url:string, data:{}) {
    let promise = new Promise((resolve, reject) => {

      this.hhtp.post(url, data)
      .toPromise()
      .then((res:any) => {
        console.log(res);
        resolve(res)
      })
    })

    return promise

  }
}
