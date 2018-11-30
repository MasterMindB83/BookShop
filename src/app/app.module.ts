import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { BooksComponent } from './books/books.component';
import { UserComponent } from './user/user.component';
import { RegisterUpComponent } from './register-up/register-up.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import {FormsModule} from '@angular/forms';
import { EmitterService } from './emitter.service';
import { BookComponent } from './book/book.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    BooksComponent,
    UserComponent,
    RegisterUpComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService, EmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
