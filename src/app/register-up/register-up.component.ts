import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {DataService} from '../data.service';
import { IUser } from '../interfaces';
import { EmitterService } from '../emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-up',
  templateUrl: './register-up.component.html',
  styleUrls: ['./register-up.component.css']
})
export class RegisterUpComponent implements OnInit {
  username: string;
  name: string;
  e_mail: string;
  address: string;
  city: string;
  phone: string;
  password: string;
  password2: string;
  user: IUser;
  oldUser: IUser;
  constructor(private data: DataService, private router: Router) { }
  ngOnInit() {
  }
  registerUp() {
    if (this.password === this.password2) {
      this.data.getUser(this.username).subscribe((data: IUser) => {
        this.oldUser = data[0];
        if (!this.oldUser) {
          this.data.addUser(this.username, this.name, this.e_mail, this.address, this.phone, this.password, this.city)
          .subscribe((data2) => {
            console.log('User added.');
            this.user = {
              username: this.username,
              name: this.name,
              e_mail: this.e_mail,
              address: this.address,
              password: this.password,
              phone: this.phone,
              city: this.city
            };
            localStorage.setItem('username', this.user.username);
            localStorage.setItem('name', this.user.name);
            localStorage.setItem('e_mail', this.user.e_mail);
            localStorage.setItem('phone', this.user.phone);
            localStorage.setItem('password', this.user.password);
            localStorage.setItem('address', this.user.address);
            localStorage.setItem('city', this.user.city);
            EmitterService.login.emit(this.user);
            this.router.navigate(['/']);
          });
        }
      });
    } else {
      alert('Password not the same.');
    }
  }
  keyDown(event) {
    if (event.key === 'Enter') {
      this.registerUp();
    }
  }
}
