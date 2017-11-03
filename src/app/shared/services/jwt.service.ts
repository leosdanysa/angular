import {Injectable} from "@angular/core";
import {Authentication} from "../model";

@Injectable()
export class JwtService {
  getToken(): string {
    return window.localStorage['userToken'];
  }

  getSecurityToken(): string {
    if (this.getToken() == null)
      return null;

    let authentication = JSON.parse(this.getToken()) as Authentication;

    return btoa(authentication.principal + ':' + authentication.credentials);
  }

  saveToken(token: string) {
    window.localStorage['userToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('userToken');
  }
}
