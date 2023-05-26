import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivosService {

  constructor(private http: HttpClient) { }

  urllocal:string = "http://localhost:3000"

  upload(file:File,url:string,inputName:string) {

    const formData: FormData = new FormData
    formData.append(inputName,file)

    const req = new HttpRequest("GET",url,formData,{
      reportProgress:true,
      responseType:'json'
    })

    return this.http.request(req)

  }

}
