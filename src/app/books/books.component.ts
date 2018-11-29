import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces';
import { emit } from 'cluster';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  user: IUser;
  constructor() { }

  ngOnInit() {
    this.user = {
      username: localStorage.getItem('username'),
      name: localStorage.getItem('name'),
      address: localStorage.getItem('address'),
      e_mail: localStorage.getItem('e_mail'),
      phone: localStorage.getItem('phone')
    };
  }

}
