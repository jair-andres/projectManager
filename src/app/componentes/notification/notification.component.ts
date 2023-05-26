import { Component } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  constructor(public msg:MensajesService){}

}
