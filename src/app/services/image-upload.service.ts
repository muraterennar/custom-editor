import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomHttpClientService } from './custom-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(
    private customHttp: CustomHttpClientService
  ) { }

  IsDataSuccessful: boolean = false;

  getFiles(data?: any) {
    this.customHttp.get({
      controller: 'images'
    }).subscribe((response) => {

      data ? data = response : '';
      console.log(data);
      console.log(response);
    }, (errorResponse: HttpErrorResponse) => {
      console.log(errorResponse);
    })
  }


  fileUpload(file: File): boolean {
    const fileData: FormData = new FormData();
    fileData.append(file.name, file);

    this.customHttp.post({
      controller: "Images",
      action: 'upload',
      headers: new HttpHeaders({ "responseType": "blob" })
    }, fileData).subscribe(() => {
      this.IsDataSuccessful = true;
    }, (errorResponse: HttpErrorResponse) => {
      this.IsDataSuccessful = false;
      console.log(errorResponse);
    });

    if (this.IsDataSuccessful == false) {
      return false;
    }

    return true;
  }

  imageReader(image: HTMLImageElement, fileInput: HTMLInputElement) {
    var reader: FileReader = new FileReader();
    reader.onload = () => {
      image.src = reader.result as string;
    }

    if (fileInput) {
      let file: File = fileInput.files[0];
      reader.readAsDataURL(file);
    }
    else {
      image.src = '';
    }
  }
}
