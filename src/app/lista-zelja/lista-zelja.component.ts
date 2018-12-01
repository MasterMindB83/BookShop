import { Component, OnInit } from '@angular/core';
import { IBook } from '../interfaces';
import { DataService } from '../data.service';
import { EmitterService } from '../emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-zelja',
  templateUrl: './lista-zelja.component.html',
  styleUrls: ['./lista-zelja.component.css']
})
export class ListaZeljaComponent implements OnInit {

  username: string;
  books: IBook[];
  constructor(private data: DataService, private router: Router) { }

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
  navigate(id) {
    this.router.navigate(['books/' + id]);
  }
  delete(id) {}
  refreshUser() {
    alert('test');
    this.username = localStorage.getItem('username');
  }
}
