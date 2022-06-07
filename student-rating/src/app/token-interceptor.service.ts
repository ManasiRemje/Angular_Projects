import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(LoginService);
    
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `${authService.getToken()}`,
        'Content-Type': 'application/json',
      }
    })
    return next.handle(tokenizedReq);
  }
}