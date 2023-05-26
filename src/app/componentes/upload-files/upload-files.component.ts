import { Component, Input } from '@angular/core';
import { SubirArchivosService } from 'src/app/servicios/subir-archivos.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent {

  constructor(private uploadService: SubirArchivosService){}

  @Input() urldestino:string = ""
  @Input() path:string = ""
  @Input() fileName:string = ""



}
