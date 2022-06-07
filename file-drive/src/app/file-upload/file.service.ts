import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IFolder, IGetCofig, IRequest, ISettings, ISettingsConfig } from './user/user-page-data';
import { Subject, Observable } from 'rxjs';
import { IDelete, IFiles } from './files/files-data';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private subject = new Subject();

  sendClickEvent() {
    this.subject.next(Math.random());
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  sendAddEvent() {
    this.subject.next(Math.random());
  }

  getAddEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor(private http: HttpClient) { }

  url: string = 'https://340d-2409-4042-4d8e-6ac0-8058-3dbd-ac6d-255d.ngrok.io/';

  apiAddFolder(data: IFolder) {
    return this.http.post<any>(`${this.url}user/createFolder`, data);
  }

  apiAddFile(data: FormData) {
    return this.http.post<any>(`${this.url}user/createFile`, data);
  }

  apiGetConfig() {
    return this.http.get<ISettingsConfig>(`${this.url}user/getConfig`);
  }

  apiChangeSettings(data: ISettings) {
    return this.http.post<any>(`${this.url}user/createRequest`, data);
  }

  apiGetFiles(data: string) {
    return this.http.get<IFiles>(`${this.url}user/getAllFilesOfFolder/${data}`);
  }

  apiGetFolders() {
    return this.http.get<any>(`${this.url}user/getAllFolder`);
  }

  apiDeleteFolder(data:any){
    return this.http.put<any>(`${this.url}user/deleteFolder`, data);
  }

  apiDeleteFile(data:IDelete){
    console.log(data);
    return this.http.put<any>(`${this.url}user/deleteFile`, data);
  }

  apiDownloadFile(folder:string, file:string){
    console.log(`${this.url}user/download/${folder}/${file}`);
    return this.http.get(`${this.url}user/download/${folder}/${file}`,{
        responseType: 'blob',
    });
  }

  apiGetUserRequest(){
    return this.http.get<IRequest>(`${this.url}user/getRequest`);
  }

}
