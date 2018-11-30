import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { EmitterService } from '../emitter.service';
import { IUser } from '../interfaces';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username: string;
  name: string;
  e_mail: string;
  address: string;
  phone: string;
  oldPassword: string;
  newPassword: string;
  exists: number;
  user: IUser;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.name = localStorage.getItem('name');
    this.e_mail = localStorage.getItem('e_mail');
    this.phone = localStorage.getItem('phone');
    this.address = localStorage.getItem('address');
  }
  save() {
    this.data.login(this.username, this.oldPassword).subscribe((data) => {
      this.exists = data[0].count;
      if (this.exists) {
        let password = this.oldPassword;
        if(this.newPassword) {
          password = this.newPassword;
        }
        this.data.updateUser(this.username, this.name, this.phone, this.address, this.e_mail, password).subscribe(() => {
          console.log('User updated.');

          localStorage.setItem('username', this.username);
          localStorage.setItem('name', this.name);
          localStorage.setItem('e_mail', this.e_mail);
          localStorage.setItem('phone', this.phone);
          localStorage.setItem('password', this.newPassword);
          localStorage.setItem('address', this.address);
          this.user = {
            username: this.username,
            name: this.name,
            e_mail: this.e_mail,
            password: this.newPassword,
            address: this.address,
            phone: this.phone
          };
          EmitterService.login.emit(this.user);
          alert('User changed.');
        });
      } else {
        alert('Wrong password.');
      }
    });
  }
}
