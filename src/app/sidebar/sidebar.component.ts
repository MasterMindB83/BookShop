import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces';
import { DataService } from '../data.service';
import { EmitterService } from '../emitter.service';
import { Router } from '@angular/router';

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
  wishlistTotal: number;
  wishlistKolicina: number;
  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('username') !== 'null') {
      this.user = {
        username: localStorage.getItem('username'),
        name: localStorage.getItem('name'),
        address: localStorage.getItem('address'),
        e_mail: localStorage.getItem('e_mail'),
        phone: localStorage.getItem('phone'),
        password: localStorage.getItem('password'),
        city: localStorage.getItem('city')
      };
    } else {
      this.user = null;
    }
    this.cartTotal = 0;
    this.cartKolicina = 0;
    this.wishlistTotal = 0;
    this.wishlistKolicina = 0;
    this.getCartSumary();
    this.getWishlistSumary();
    EmitterService.login.subscribe((data) => {
      this.user = data;
      this.getCartSumary();
      this.getWishlistSumary();
    });
    EmitterService.cart.subscribe(() => {
      this.getCartSumary();
    });
    EmitterService.wishlist.subscribe(() => {
      this.getWishlistSumary();
    });
  }
  logOut() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.setItem('username', null);
      localStorage.setItem('name', null);
      localStorage.setItem('address', null);
      localStorage.setItem('e_mail', null);
      localStorage.setItem('phone', null);
      localStorage.setItem('password', null);
      localStorage.setItem('city', null);
      this.user = null;
      EmitterService.login.emit(this.user);
      this.router.navigate(['/']);
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
  getWishlistSumary() {
    if (this.user) {
      this.data.getWishlistSumary(this.user.username).subscribe((data) => {
        this.wishlistKolicina = data[0].kolicina;
        this.wishlistTotal = data[0].total;
      });
    } else {
      this.wishlistTotal = 0;
      this.wishlistKolicina = 0;
    }
  }
}
