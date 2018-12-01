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
  total: number;
  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.refreshData();
    EmitterService.login.subscribe((data) => {
      this.username = localStorage.getItem('username');
    });
    EmitterService.wishlist.subscribe(() => {
      this.refreshData();
    });
  }
  refreshData() {
    this.data.getListaZelja(this.username).subscribe((data: IBook[]) => {
      this.books = data;
    });
  }
  moveTo(id) {
    if (confirm('Do you want to move this book to Cart?')) {
        this.data.getCartBook(this.username, id).subscribe((data) => {
        if (data[0].count === 0) {
          this.data.movetoCart(this.username, id).subscribe((data2) => {
            console.log('Moved to cart.');
            this.refreshData();
            EmitterService.cart.emit();
            EmitterService.wishlist.emit();
            this.refreshData();
          });
        } else {
          alert('Book alredy in Cart.');
        }
      });
    }
  }
  navigate(id) {
    this.router.navigate(['books/' + id]);
  }
  delete(id) {
    if (confirm('Do you want to delete this book?')) {
      this.data.delecteWishlistBook(this.username, id).subscribe((data) => {
        EmitterService.wishlist.emit();
        this.refreshData();
      });
    }
  }
  refreshUser() {
    this.username = localStorage.getItem('username');
  }
}
