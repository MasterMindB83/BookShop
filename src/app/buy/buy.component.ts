import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { EmitterService } from '../emitter.service';
import { IBook } from '../interfaces';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  books: IBook[];
  username: string;
  kolicina: number;
  total: number;
  totalWithoutDiscount: number;
  totalDiscount: number;
  discountAmount: number;
  discount: number;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.getDiscount();
  }
  refreshData() {
    this.data.getKorpa(this.username).subscribe((data: IBook[]) => {
      this.books = data;
      this.calculateTotal();
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
    this.kolicina = 0;
    this.totalWithoutDiscount = 0;
    for (let i = 0; i < this.books.length; i++) {
      this.total += this.books[i].total;
      this.kolicina += this.books[i].kolicina;
      this.totalWithoutDiscount += this.books[i].kolicina * this.books[i].price;
    }
    if (this.kolicina >= this.discountAmount) {
      this.totalDiscount = this.total - this.total * this.discount;
    } else {
      this.totalDiscount = this.total;
    }
  }
  getDiscount() {
    this.data.getDiscount().subscribe((data) => {
      this.discountAmount = data[0].amount;
      this.discount = data[0].discount;
      this.refreshData();
    });
  }
}
