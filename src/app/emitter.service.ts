import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  emitter = new EventEmitter();
  constructor() { }
  sendMessage(data: Object) {
    this.emitter.emit(data);
  }
}
