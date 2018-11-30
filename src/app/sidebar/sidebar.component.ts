import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces';
import { DataService } from '../data.service';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: IUser;
  room: number;
  constructor() { }

  ngOnInit() {
    EmitterService.login.subscribe((data) => {
      this.user = data;
    });
  }
  logOut() {
    if (confirm('Are you sure you want to logout?')) {
      this.user = null;
      localStorage.setItem('username', '');
      EmitterService.login.emit(this.user);
    }
  }
}
