import { Component, OnInit } from '@angular/core';
import { IUser, IBook } from '../interfaces';
import {DataService} from '../data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  user: IUser;
  books: IBook[];
  count: number;
  index: number;
  genre: string;
  name: string;
  booksNo: number;
  maxIndex: number;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.index = 1;
    this.count = 18;
    this.user = {
      username: localStorage.getItem('username'),
      name: localStorage.getItem('name'),
      address: localStorage.getItem('address'),
      e_mail: localStorage.getItem('e_mail'),
      phone: localStorage.getItem('phone'),
      password: localStorage.getItem('password'),
      city: localStorage.getItem('city')
    };
    this.genre = '';
    this.name = '';
    this.refreshDataFull();
  }
  refreshData() {
    this.data.getBooks(this.count, this.index, this.genre, this.name).subscribe((data: IBook[]) => {
      this.books = data;
    });
  }
  refreshDataFull() {
    this.data.getBooksNo(this.genre, this.name).subscribe((data) => {
      this.booksNo = data[0].count;
      this.maxIndex = Math.round(this.booksNo / this.count);
      if (this.count * this.maxIndex < this.booksNo) {
        this.maxIndex ++;
      }
      this.index = 1;
      this.data.getBooks(this.count, this.index, this.genre, this.name).subscribe((data2: IBook[]) => {
        this.books = data2;
      });
    });
  }
  search() {
    this.refreshDataFull();
  }
  increase() {
    if (this.index < this.maxIndex) {
      this.index++;
      this.refreshData();
    }
  }
  decrease() {
    if  (this.index > 1) {
      this.index --;
      this.refreshData();
    }
  }
}
