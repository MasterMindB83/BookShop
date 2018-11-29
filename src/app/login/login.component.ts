import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { IUser } from '../interfaces';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  exists: number;
  user: IUser;
  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.data.login(this.username, this.password).subscribe((data) => {
      this.exists = data[0].count;
      if (this.exists === 1) {
        this.data.getUser(this.username).subscribe((data2: IUser) => {
          this.user = data2[0];
          EmitterService.login.emit(this.user);
          this.router.navigate(['/']);
        });
      } else {
        alert('Wrong username or password.');
      }
    });
  }
  keyDown(event) {
    if (event.key === 'Enter') {
      this.login();
    }
  }
}
