import { Component, OnInit } from '@angular/core';
import { IBook } from '../interfaces';
import { DataService } from '../data.service';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'app-lista-zelja',
  templateUrl: './lista-zelja.component.html',
  styleUrls: ['./lista-zelja.component.css']
})
export class ListaZeljaComponent implements OnInit {

  username: string;
  books: IBook[];
  constructor(private data: DataService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.refreshData();
    EmitterService.login.subscribe((data) => {
      this.username = localStorage.getItem('username');
    });
  }
  refreshData() {
    this.data.getListaZelja(this.username).subscribe((data: IBook[]) => {
      this.books = data;
    });
  }
  moveTo(id) {
    this.data.movetoCart(this.username, id).subscribe((data) => {
      console.log('Moved to cart.');
      this.refreshData();
    });
  }
}
