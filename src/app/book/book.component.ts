import { Component, OnInit } from '@angular/core';
import { IBook } from '../interfaces';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book: IBook;
  usteda: number;
  procenat: number;
  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.refreshData();
  }
  refreshData() {
    const id = this.route.snapshot.paramMap.get('id');
    this.data.getBook(id).subscribe((data) => {
      this.book = data[0];
      if (this.book.discount) {
        this.usteda = this.book.price - this.book.discount;
        this.procenat = Math.round(this.usteda / this.book.price * 100);
      }

    });
  }
}
