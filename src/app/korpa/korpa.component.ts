import { Component, OnInit } from '@angular/core';
import { IBook } from '../interfaces';
import { DataService } from '../data.service';

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
      this.data.getKorpa(this.username).subscribe((data: IBook[]) => {
        this.books = data;
      });
    }
  }

}
