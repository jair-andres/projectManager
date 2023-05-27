import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    const requestOption = {
      Headers:new HttpHeaders({
        // configura cabezaras
      }),
      withCredentials:true
    }

    const reqClone = req.clone(requestOption)

    return next.handle(reqClone)
  }
}
