import { Component, OnInit } from '@angular/core';
import { IBook } from '../interfaces';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { EmitterService } from '../emitter.service';

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
  }
  refreshData() {
    this.username = localStorage.getItem('username');
    const id = this.route.snapshot.paramMap.get('id');
    this.data.getBook(id).subscribe((data) => {
      this.book = data[0];
      if (this.book.discount) {
        this.usteda = this.book.price - this.book.discount;
        this.procenat = Math.round(this.usteda / this.book.price * 100);
      }

    });
    EmitterService.login.subscribe((data) => {
    this.username = localStorage.getItem('username');
    });
  }
  addToCart() {
    this.data.addToCart(this.username, this.book.id, this.kolicina).subscribe((data) =>{
      alert('Book added to cart.');
    });
  }
}
