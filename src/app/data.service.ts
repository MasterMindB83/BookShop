import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  addUser(username1, name1, e_mail1, address1, phone1, password1) {
    return this.http.post('http://localhost:3000/adduser',
    {username: username1, name: name1, e_mail1: e_mail1, address: address1, phone: phone1, password: password1});
  }
  login(username, password) {
    return this.http.get('http://localhost:3000/login/' + username + '/' + password);
  }
  getUser(username) {
    return this.http.get('http://localhost:3000/users/' + username);
  }
  updateUser(username, name, phone, address, e_mail, password) {
    return this.http.post('http://localhost:3000/updateuser',
    {username: username, name: name, address: address, e_mail: e_mail, phone: phone, password: password});
  }
  getBooks(count, index, genre, name) {
    let genre2 = genre;
    let name2 = name;
    if (!genre) {
      genre2 = '-1';
    }
    if (!name) {
      name2 = '-1';
    }
    return this.http.get('http://localhost:3000/books/' + name2 + '/' + genre2 + '/' + index + '/' + count);
  }
  getBooksNo(genre, name) {
    let genre2 = genre;
    let name2 = name;
    if (!genre) {
      genre2 = '-1';
    }
    if (!name) {
      name2 = '-1';
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
}
