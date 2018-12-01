import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces';
import { DataService } from '../data.service';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: IUser;
  room: number;
  cartTotal: number;
  cartKolicina: number;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.cartTotal = 0;
    this.cartKolicina = 0;
    EmitterService.login.subscribe((data) => {
      this.user = data;
      this.getCartSumary();
    });
    EmitterService.cart.subscribe(() => {
      this.getCartSumary();
    });
  }
  logOut() {
    if (confirm('Are you sure you want to logout?')) {
      this.user = null;
      localStorage.setItem('username', '');
      EmitterService.login.emit(this.user);
    }
  }
  getCartSumary() {
    if (this.user) {
      this.data.getCartSumary(this.user.username).subscribe((data) => {
        this.cartKolicina = data[0].kolicina;
        this.cartTotal = data[0].total;
      });
    } else {
      this.cartTotal = 0;
      this.cartKolicina = 0;
    }
  }
}
