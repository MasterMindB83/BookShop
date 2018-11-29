import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { IUser } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookShop';
  /*ngOnInit(): void {
    this.room = Math.round(Math.random() * 10000);
  }*/
}
