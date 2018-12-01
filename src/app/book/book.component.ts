import { Component, OnInit } from '@angular/core';
import { IBook } from '../interfaces';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import {EmitterService} from '../emitter.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book: IBook;
  usteda: number;
  procenat: number;
  kolicina: number;
  username: string;
  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.refreshData();
    this.kolicina = 1;
    EmitterService.login.subscribe(() => {
        this.username = localStorage.getItem('username');
        });
  }
  refreshData() {
    this.kolicina = 1;
    this.username = localStorage.getItem('username');
    const id = this.route.snapshot.paramMap.get('id');
    this.data.getBook(id).subscribe((data) => {
      this.book = data[0];
      if (this.book.discount) {
        this.usteda = this.book.price - this.book.discount;
        this.procenat = Math.round(this.usteda / this.book.price * 100);
      }

    });
  }
  addToCart() {
    this.data.getCartBook(this.username, this.book.id).subscribe((data) => {
      const exists = data[0].count;
      if (exists === 0) {
        this.data.addToCart(this.username, this.book.id, this.kolicina).subscribe(() => {
          alert('Book added to cart.');
          EmitterService.cart.emit();
        });
      } else {
        alert('Book is alredy in cart.');
      }
    });
  }
}
