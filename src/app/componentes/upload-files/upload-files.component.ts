import { HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { SubirArchivosService } from 'src/app/servicios/subir-archivos.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent {

  progress:number = 0
  selectedFiles:any
  archivoseleccionado:any
  mensaje:string = ""
  imagenprofile:string = ""

  constructor(private uploadService: SubirArchivosService,private msg:MensajesService){}

  @Input() urldestino:string = ""
  @Input() path:string = ""
  @Input() fileName:string = ""


  nombrearchivo:string = "Selecciona el Archivo"

  selectFile(event:any){
    this.selectedFiles = event.target.files
    this.nombrearchivo = this.selectedFiles[0].name 
    console.log(this.selectedFiles[0].name)
  }


  upload():void{

    this.progress = 0
    this.archivoseleccionado = this.selectedFiles.item(0)
    this.imagenprofile = this.urldestino + this.path + this.fileName + ".png"
    console.log(this.imagenprofile)
/*     console.log(
      `archivoseleccionado: ${this.archivoseleccionado}\n 
      urldestino: ${this.urldestino}\n
      path: ${this.path}\n
      fileName: ${this.fileName}\n`
      ) */
    this.uploadService.upload(this.archivoseleccionado,this.urldestino + this.path,this.fileName).subscribe(
      (event:any) => {
        
/*          console.log(event)
        console.log(event.body) */
 
        if(event.type === HttpEventType.UploadProgress){
          this.progress = Math.round(100 * event.loaded / event.total)
        }
        else{
/*           console.log(event.body)
 */        
/*             this.mensaje = event.body.mensaje
            console.log(this.mensaje) */
          setTimeout(()=>{
            this.progress = 0
            this.nombrearchivo = "Selecciona el Archivo"
            this.mensaje = ""
            let mensajeBis = "Imagen actualizado"
            this.msg.Load(mensajeBis, "success", 5000)
            location.reload()
          },2000)
        }


      },err =>{
        this.progress = 0
        this.nombrearchivo = "Seleciona el Archivo"
        this.mensaje = "Se Presento un error al Subir el Archivo"
      })

      this.selectedFiles = undefined




  }


}
