import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  addUser(username1, name1, e_mail1, address1, phone1, password1, city) {
    return this.http.post('http://localhost:3000/adduser',
    {username: username1, name: name1, e_mail1: e_mail1, address: address1, phone: phone1, password: password1, city: city});
  }
  login(username, password) {
    return this.http.get('http://localhost:3000/login/' + username + '/' + password);
  }
  getUser(username) {
    return this.http.get('http://localhost:3000/users/' + username);
  }
  updateUser(username, name, phone, address, e_mail, password, city) {
    return this.http.post('http://localhost:3000/updateuser',
    {username: username, name: name, address: address, e_mail: e_mail, phone: phone, password: password, city: city});
  }
  getBooks(count, index, genre, name) {
    let genre2 = '-1';
    let name2 = '-1';
    if (genre.length > 0) {
      genre2 = genre;
    }
    if (name.length > 0) {
      name2 = name;
    }
    return this.http.get('http://localhost:3000/books/' + name2 + '/' + genre2 + '/' + index + '/' + count);
  }
  getBooksNo(genre, name) {
    let genre2 = '-1';
    let name2 = '-1';
    if (genre.length > 0) {
      genre2 = genre;
    }
    if (name.length > 0) {
      name2 = name;
    }
    return this.http.get('http://localhost:3000/booksno/' + name2 + '/' + genre2);
  }
  getBook(id) {
    return this.http.get('http://localhost:3000/books/' + id );
  }
  getKorpa(username) {
    return this.http.get('http://localhost:3000/korpa/' + username );
  }
  getListaZelja(username) {
    return this.http.get('http://localhost:3000/listazelja/' + username );
  }
  movetoCart(username, book) {
    return this.http.post('http://localhost:3000/movetokorpa', {username: username, id: book });
  }
  movetoWishlist(username, book) {
    return this.http.post('http://localhost:3000/movetolistazelja', {username: username, id: book });
  }
  addToCart(username, book, kolicina) {
    return this.http.post('http://localhost:3000/addtocart',
     {username: username, book: book, kolicina: kolicina });
  }
  getCartBook(user, book) {
    return this.http.get('http://localhost:3000/cartbook/' + user + '/' + book );
  }
  deleteCartBook(user, book) {
    return this.http.delete('http://localhost:3000/deletecartbook/' + user + '/' + book );
  }
  updateCart(username, book, kolicina, total) {
    return this.http.post('http://localhost:3000/updatecart',
    {username: username, book: book, kolicina: kolicina, total: total });
  }
  getCartSumary(username) {
    return this.http.get('http://localhost:3000/carttotal/' + username);

  }
  addToWishlist(user, book) {
    return this.http.post('http://localhost:3000/addtowishlist',
    {user: user, book: book});
  }
  getWishlistBook(user, book) {
    return this.http.get('http://localhost:3000/wishlistbook/' + user + '/' + book);

  }
  delecteWishlistBook(user, book) {
    return this.http.get('http://localhost:3000/deletefromwishlist/' + user + '/' + book);
  }
  getWishlistSumary(user) {
    return this.http.get('http://localhost:3000/wishlisttotal/' + user);
  }
  getDiscount() {
    return this.http.get('http://localhost:3000/discount');
  }
}
