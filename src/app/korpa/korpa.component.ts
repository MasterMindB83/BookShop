import { Component, OnInit } from '@angular/core';
import { IBook } from '../interfaces';
import { DataService } from '../data.service';
import { EmitterService } from '../emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-korpa',
  templateUrl: './korpa.component.html',
  styleUrls: ['./korpa.component.css']
})
export class KorpaComponent implements OnInit {

  books: IBook[];
  username: string;
  kolicina: number[];
  total: number;
  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.total = 0;
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
      this.calculateTotal();
    });
  }
  delete(id) {
    this.data.deleteCartBook(this.username, id).subscribe(() => {
      console.log('Book deleted.');
      this.refreshData();
    });
  }
  calculate(id) {
    const index = this.findBook(id);
    if (index > -1) {
      let price = this.books[index].price;
      if (this.books[index].discount) {
        price = this.books[index].discount;
      }
      this.books[index].total = this.books[index].kolicina * price;
    }
    this.calculateTotal();
  }
  findBook(id) {
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].id === id) {
        return i;
      }
    }
    return -1;
  }
  calculateTotal() {
    this.total = 0;
    for (let i = 0; i < this.books.length; i++) {
      this.total += this.books[i].total;
    }
  }
  navigate(id) {
    this.router.navigate(['books/' + id]);
  }
}
