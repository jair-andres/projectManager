import { HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionUsuariosService } from 'src/app/servicios/peticion-usuarios.service';
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

  testUrl:string = ""

  constructor(private uploadService: SubirArchivosService,private msg:MensajesService,public peticion:PeticionUsuariosService){}

  @Input() urldestino:string = ""
  @Input() path:string = ""
  @Input() fileName:string = ""
  @Input() idUsuario:any


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
    this.uploadService.upload(this.archivoseleccionado,this.urldestino + this.path,this.fileName).subscribe(
      (event:any) => {
        if(event.type === HttpEventType.UploadProgress){
          this.progress = Math.round(100 * event.loaded / event.total)
        }
        else{
          setTimeout(()=>{
            this.progress = 0
            this.nombrearchivo = "Selecciona el Archivo"
            this.mensaje = ""
            let mensajeBis = "Imagen actualizado"
            this.msg.Load(mensajeBis, "success", 5000)
            this.actualizarImagenUsuario(this.idUsuario)
          },2000)
        }


      },err =>{
        this.progress = 0
        this.nombrearchivo = "Seleciona el Archivo"
        this.mensaje = "Se Presento un error al Subir el Archivo"
      })

      this.selectedFiles = undefined




  }

  actualizarImagenUsuario(idUsuario:string){
    console.log("PATH ===> ",this.path)
    this.testUrl = this.urldestino + "/back/perfiles/"+ idUsuario + ".png"
    console.log(this.testUrl)
    let post = {
      hots:this.peticion.urllocal,
      path:"Usuarios/Actualizar",
      payload:{
        id:idUsuario,
        imageUrl:this.testUrl
      }
    }
    this.peticion.Post(post.hots + post.path,post.payload).then((res:any) => {
      console.log(res)
      if(res.state == false){
        this.msg.Load(res.mensaje, "danger", 5000)
      } else {
        this.msg.Load(res.mensaje, "success", 5000)
        location.reload()
      }
    })
    
  }
}
