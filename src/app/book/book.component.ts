import { Component, OnInit } from '@angular/core';
import { IBook } from '../interfaces';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book: IBook;
  constructor() { }

  ngOnInit() {
  }

}
