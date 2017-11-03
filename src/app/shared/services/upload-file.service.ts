import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {HttpEvent} from "@angular/common/http";

@Injectable()
export class UploadFileService {
  constructor (private apiService: ApiService){}

  public uploadFile(file: File): Observable<HttpEvent<{}>> {
    let formData : FormData = new FormData();
    formData.append('file', file);
    //formData.append('${_csrf.parameterName}', '${_csrf.token}');

    return this.apiService.postFile('/file', formData);
  }
}
