import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {DataService} from '../data.service';
import { IUser } from '../interfaces';
import { EmitterService } from '../emitter.service';

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
  phone: string;
  password: string;
  password2: string;
  user: IUser;
  constructor(private data: DataService, private emitter: EmitterService) { }
  ngOnInit() {
  }
  registerUp() {
    if (this.password === this.password2) {
      this.data.addUser(this.username, this.name, this.e_mail, this.address, this.phone, this.password)
      .subscribe((data) => {
        console.log('User added.');
        alert('Register successful.');
        localStorage.setItem('username', this.username);
        localStorage.setItem('name', this.name);
        localStorage.setItem('e_mail', this.e_mail);
        localStorage.setItem('address', this.address);
        localStorage.setItem('password', this.password);
        this.user = {
          username: this.username,
          name: this.name,
          e_mail: this.e_mail,
          address: this.address,
          password: this.password,
          phone: this.phone
        };
        this.emitter.sendMessage(this.user);
        document.location.href = '/';
      });
    } else {
      alert('Password not the same.');
    }
  }
}
