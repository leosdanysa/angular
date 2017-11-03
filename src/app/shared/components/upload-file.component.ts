import {Component} from '@angular/core';
import {UploadFileService} from '../services';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'file-upload',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  files: FileList;
  currentFile: File;
  progress: {percentage: number} = {percentage: 0};

  constructor(private uploadFileService: UploadFileService) {}

  selectFile(event): void {
    this.files = event.target.files;
  }

  upload(): void {
    this.progress.percentage = 0;

    this.currentFile = this.files.item(0);

    this.uploadFileService.uploadFile(this.currentFile).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File uploades.');
      }
    });

    this.files = undefined;
  }
}
