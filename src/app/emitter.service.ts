import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  static login = new EventEmitter();
  static cart = new EventEmitter();
  constructor() { }
}
