import {HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest}        from "@angular/common/http";
import {Observable}   from "rxjs/Observable";
import {Injectable, Injector}   from "@angular/core";
import {JwtService} from "../services/jwt.service";

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {

  //Using injector instead of directly inject LoginService due to
  //error related to CYCLIC DEPENDENCY
  constructor(private injector: Injector){ }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtService = this.injector.get(JwtService);

    //Add common headers
    let headers = req.headers;

    if (req.body instanceof FormData) {
      console.log("formData");
      //headers['Content-Type'] = 'multipart/form-data';
    } else {
      //headers['Content-Type'] = 'application/json';
      headers.append('Content-Type', 'application/json');
    }

    //headers['Accept'] = 'application/json';
    headers.append('Accept', 'application/json');
    headers.append('XSRF-TOKEN','521106b2-f761-4efb-83ea-0ff66f747195');

    let token = jwtService.getSecurityToken();

    if (token != null) {
      //headers['Authorization'] = 'Basic ' + token;
      headers.append('Authorization', 'Basic ' + token);
    }

    req = req.clone({
      //setHeaders: headers
      headers: headers
    });

    return next.handle(req);
  }

}
