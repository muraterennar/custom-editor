import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpClientService } from './custom-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(
    public customHttp: CustomHttpClientService
  ) { }

  getFiles() {
    this.customHttp.get({
      controller: 'images'
    }).subscribe((response) => {
      console.log(response);
    }, (errorResponse: HttpErrorResponse) => {
      console.log(errorResponse);
    })
  }

  // getFileByImageName(imageName: string) {
  //   debugger;
  //   this.customHttp.get<ImageModel>({
  //     controller: "images",
  //     action: `GetByImagePath/${imageName}`,
  //   }).subscribe(response => {
  //     console.log(response);

  //   }, (errorResponse: HttpErrorResponse) => {
  //     console.log(errorResponse);
  //   });
  // }

  fileUpload(file: File, fileName: string) {
    const fileData: FormData = new FormData();
    fileData.append(fileName, file);

     return this.customHttp.post({
      controller: "Images",
      action: `upload/${fileName}`,
      headers: new HttpHeaders({ "responseType": "blob" })
    }, fileData);
  }

  getFileByImageName(imageName: string) {
    return this.customHttp.get<ImageModel>({
      controller: "images",
      action: `GetByImagePath/${imageName}`,
    });
  }


  // fileUpload(file: File, fileName: string): boolean {
  //   const fileData: FormData = new FormData();
  //   fileData.append(fileName, file);

  //   this.customHttp.post({
  //     controller: "Images",
  //     action: `upload/${fileName}`,
  //     headers: new HttpHeaders({ "responseType": "blob" })
  //   }, fileData).subscribe(() => {
  //     this.IsDataSuccessful = true;
  //   }, (errorResponse: HttpErrorResponse) => {
  //     this.IsDataSuccessful = false;
  //     console.log(errorResponse);
  //   });

  //   if (this.IsDataSuccessful == false) {
  //     return false;
  //   }

  //   return true;
  // }

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

export class ImageModel {
  id: number;
  imageName: string;
  imageUrl: string;
}
