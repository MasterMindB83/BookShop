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
  constructor(private emitter: EmitterService) { }

  ngOnInit() {
  }
  logOut() {
    this.user = null;
  }
  registerUp() {
  }
  setUser() {
    this.emitter.emitter.subscribe((data) => {
      this.user = data;
    });
  }
}
