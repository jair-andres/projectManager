import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivosService {

  constructor(private http: HttpClient) { }

  urllocal:string = "http://localhost:3000"

  upload(file:File,url:string,inputName:string): Observable<HttpEvent<any>> {

    const formData: FormData = new FormData
    formData.append(inputName,file)

    const req = new HttpRequest("POST",url,formData,{
      reportProgress:true,
      responseType:'json'
    })

    return this.http.request(req)

  }

}
