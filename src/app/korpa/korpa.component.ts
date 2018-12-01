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
    if (confirm('Dou you want to move this book to wishlist?')) {
      this.data.getWishlistBook(this.username, id).subscribe((data) => {
        if (data[0].count === 0) {
          this.data.movetoWishlist(this.username, id).subscribe((data2) => {
            this.refreshData();
            EmitterService.cart.emit('');
          });
        } else {
          alert('Book is alredy in Wishlist.');
        }
      });
    }
  }
  refreshData() {
    this.data.getKorpa(this.username).subscribe((data: IBook[]) => {
      this.books = data;
      this.calculateTotal();
    });
  }
  delete(id) {
    if (confirm('Dou you want to delete this book?')) {
      this.data.deleteCartBook(this.username, id).subscribe(() => {
        console.log('Book deleted.');
        this.refreshData();
        EmitterService.cart.emit('');
      });
    }
  }
  calculate(id) {
    const index = this.findBook(id);
    if (index > -1) {
      let price = this.books[index].price;
      if (this.books[index].discount) {
        price = this.books[index].discount;
      }
      this.books[index].total = this.books[index].kolicina * price;
      this.data.updateCart(this.username, id, this.books[index].kolicina, this.books[index].total ).subscribe(() => {
        console.log('Cart updated.');
        EmitterService.cart.emit('');
      });
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
