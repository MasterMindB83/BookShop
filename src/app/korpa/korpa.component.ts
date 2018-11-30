import { Component, OnInit } from '@angular/core';
import { IBook } from '../interfaces';
import { DataService } from '../data.service';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'app-korpa',
  templateUrl: './korpa.component.html',
  styleUrls: ['./korpa.component.css']
})
export class KorpaComponent implements OnInit {

  books: IBook[];
  username: string;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    if (this.username) {
      this.refreshData();
    }
    EmitterService.login.subscribe((data) => {
      this.username = localStorage.getItem('username');
    });
  }
  moveTo(id) {
    this.data.movetoWishlist(this.username, id).subscribe((data) => {
      this.refreshData();
    });
  }
  refreshData() {
    this.data.getKorpa(this.username).subscribe((data: IBook[]) => {
      this.books = data;
    });
  }
}
