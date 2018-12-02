import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterUpComponent } from './register-up/register-up.component';
import { BookComponent } from './book/book.component';
import { KorpaComponent } from './korpa/korpa.component';
import { ListaZeljaComponent } from './lista-zelja/lista-zelja.component';
import { BuyComponent } from './buy/buy.component';

const routes: Routes = [
  {
    path: '',
    component: BooksComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'registerup',
    component: RegisterUpComponent
  },
  {
    path: 'books/:id',
    component: BookComponent
  },
  {
    path: 'korpa',
    component: KorpaComponent
  },
  {
    path: 'listazelja',
    component: ListaZeljaComponent
  },
  {
    path: 'buy',
    component: BuyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
