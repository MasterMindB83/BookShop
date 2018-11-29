import { Component, EventEmitter, Output } from '@angular/core';
import { IUser } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookShop';
  user: IUser;
  @Output() emiter = new EventEmitter();
}
